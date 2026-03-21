#!/usr/bin/env node
/**
 * sync-to-figma.js — design-tokens → Figma Variables 동기화
 * 
 * 사용법:
 *   FIGMA_TOKEN=figd_xxx FIGMA_FILE_KEY=xxxxx node sync-to-figma.js
 * 
 * 또는:
 *   node sync-to-figma.js --file <FILE_KEY>
 * 
 * Figma 파일 키 찾는 법: 피그마 파일 URL에서
 *   https://www.figma.com/file/XXXXXXXX/파일명
 *                                ^^^^^^^^ ← 이 부분
 */

const https = require('https');
const core = require('./core.json');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_TOKEN 환경변수가 필요합니다.');
  console.error('   예: FIGMA_TOKEN=figd_xxx FIGMA_FILE_KEY=AbCd node sync-to-figma.js');
  process.exit(1);
}
const FILE_KEY = process.env.FIGMA_FILE_KEY || process.argv[process.argv.indexOf('--file') + 1];

if (!FILE_KEY) {
  console.error('❌ FIGMA_FILE_KEY 환경변수 또는 --file 인자가 필요합니다.');
  console.error('   예: FIGMA_FILE_KEY=AbCdEfGh node sync-to-figma.js');
  process.exit(1);
}

// Hex → Figma RGB (0-1 범위)
function hexToFigmaColor(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  };
}

// Figma API 요청
function figmaRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.figma.com',
      path,
      method,
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (d) => (raw += d));
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error(`JSON parse error: ${raw}`)); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// 컬러 토큰 목록 생성
function buildColorVariables() {
  const vars = [];

  // 브랜드 색상
  for (const [name, token] of Object.entries(core.color.brand)) {
    vars.push({ name: `Color/Brand/${name}`, value: hexToFigmaColor(token.value), description: token.description || '' });
  }

  // 뉴트럴
  for (const [scale, token] of Object.entries(core.color.neutral)) {
    vars.push({ name: `Color/Neutral/${scale}`, value: hexToFigmaColor(token.value) });
  }

  // 상태 색상
  for (const [name, token] of Object.entries(core.color.status)) {
    vars.push({ name: `Color/Status/${name}`, value: hexToFigmaColor(token.value) });
  }

  // AI 색상
  for (const [name, token] of Object.entries(core.color.ai)) {
    if (typeof token === 'object' && token.value) {
      vars.push({ name: `Color/AI/${name}`, value: hexToFigmaColor(token.value), description: token.description || '' });
    }
  }

  // 시니어 팔레트 (BOKHAUS)
  for (const [name, token] of Object.entries(core.color.senior)) {
    if (typeof token === 'object' && token.value) {
      vars.push({ name: `Color/Senior/${name}`, value: hexToFigmaColor(token.value) });
    }
  }

  return vars;
}

// 숫자 토큰 목록 (스페이싱, 폰트 크기 등)
function buildNumberVariables() {
  const vars = [];

  // 스페이싱
  for (const [key, token] of Object.entries(core.spacing)) {
    vars.push({ name: `Spacing/${key}`, value: parseFloat(token.value) });
  }

  // 폰트 크기
  for (const [key, token] of Object.entries(core.typography.fontSize)) {
    vars.push({ name: `Typography/FontSize/${key}`, value: parseFloat(token.value) });
  }

  // 터치 타겟
  for (const [key, token] of Object.entries(core.touchTarget)) {
    vars.push({ name: `TouchTarget/${key}`, value: parseFloat(token.value), description: token.description || '' });
  }

  // 보더 반경
  for (const [key, token] of Object.entries(core.borderRadius)) {
    if (token.value !== '9999') {
      vars.push({ name: `BorderRadius/${key}`, value: parseFloat(token.value) });
    }
  }

  return vars;
}

async function main() {
  console.log(`🎨 Figma Variables 동기화 시작 — 파일: ${FILE_KEY}\n`);

  // 1. 현재 variables 조회
  console.log('📋 기존 Variables 확인...');
  const existing = await figmaRequest('GET', `/v1/files/${FILE_KEY}/variables/local`);
  if (existing.error) {
    console.error('❌ 파일 조회 실패:', existing.message || JSON.stringify(existing));
    process.exit(1);
  }

  const collections = existing.meta?.variableCollections || {};
  const existingVars = existing.meta?.variables || {};
  console.log(`  현재 컬렉션: ${Object.keys(collections).length}개, 변수: ${Object.keys(existingVars).length}개`);

  // 2. 생성할 Variables 준비
  const colorVars = buildColorVariables();
  const numberVars = buildNumberVariables();

  console.log(`\n📦 동기화 대상:`);
  console.log(`  Color Variables: ${colorVars.length}개`);
  console.log(`  Number Variables: ${numberVars.length}개`);

  // 3. Figma Variables API로 배치 생성/업데이트
  const payload = {
    variableCollections: [
      { action: 'CREATE', id: 'col_color', name: '🎨 Color Tokens', initialModeId: 'mode_light' },
      { action: 'CREATE', id: 'col_number', name: '📐 Number Tokens', initialModeId: 'mode_default' },
    ],
    variableModes: [
      { action: 'CREATE', id: 'mode_light', variableCollectionId: 'col_color', name: 'Light' },
      { action: 'CREATE', id: 'mode_dark', variableCollectionId: 'col_color', name: 'Dark' },
      { action: 'CREATE', id: 'mode_default', variableCollectionId: 'col_number', name: 'Default' },
    ],
    variables: [
      ...colorVars.map((v, i) => ({
        action: 'CREATE',
        id: `var_color_${i}`,
        name: v.name,
        variableCollectionId: 'col_color',
        resolvedType: 'COLOR',
        description: v.description || '',
      })),
      ...numberVars.map((v, i) => ({
        action: 'CREATE',
        id: `var_num_${i}`,
        name: v.name,
        variableCollectionId: 'col_number',
        resolvedType: 'FLOAT',
        description: v.description || '',
      })),
    ],
    variableModeValues: [
      ...colorVars.map((v, i) => ({
        variableId: `var_color_${i}`,
        modeId: 'mode_light',
        value: v.value,
      })),
      ...numberVars.map((v, i) => ({
        variableId: `var_num_${i}`,
        modeId: 'mode_default',
        value: v.value,
      })),
    ],
  };

  console.log('\n🚀 Figma API로 Variables 생성 중...');
  const result = await figmaRequest('POST', `/v1/files/${FILE_KEY}/variables`, payload);

  if (result.error) {
    console.error('❌ 생성 실패:', JSON.stringify(result, null, 2));
    process.exit(1);
  }

  console.log('\n✅ 동기화 완료!');
  console.log('  생성된 컬렉션:', Object.keys(result.meta?.variableCollections || {}).length);
  console.log('  생성된 Variables:', Object.keys(result.meta?.variables || {}).length);
  console.log(`\n🔗 Figma 파일: https://www.figma.com/file/${FILE_KEY}`);
}

main().catch((e) => {
  console.error('❌ 오류:', e.message);
  process.exit(1);
});
