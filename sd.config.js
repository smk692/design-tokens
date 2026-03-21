/**
 * Style Dictionary 빌드 설정
 * 
 * 사용법: npm run build
 * 출력:
 *   dist/platforms/web.css   — CSS Variables
 *   dist/platforms/rn.ts     — React Native TypeScript
 *   dist/platforms/js.js     — 일반 JS 객체
 */

const StyleDictionary = require('style-dictionary');

// 커스텀 변환: px 단위 추가 (dimension 타입)
StyleDictionary.registerTransform({
  name: 'size/pxValue',
  type: 'value',
  matcher: (token) => token.type === 'dimension',
  transformer: (token) => `${token.value}px`,
});

// 커스텀 변환: 컬러 hex 그대로 유지
StyleDictionary.registerTransform({
  name: 'color/hex',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transformer: (token) => token.value,
});

// CSS Variables 포맷
StyleDictionary.registerFormat({
  name: 'css/custom-vars',
  formatter: ({ dictionary, options }) => {
    const tokens = dictionary.allTokens;
    const vars = tokens.map((t) => {
      const name = t.path.join('-').toLowerCase();
      return `  --${name}: ${t.value};`;
    }).join('\n');
    return `:root {\n${vars}\n}\n`;
  },
});

module.exports = {
  source: ['core.json', 'semantic.json'],
  
  platforms: {
    // CSS Variables (Next.js, 청첩장)
    web: {
      transformGroup: 'css',
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/hex', 'size/pxValue'],
      buildPath: 'dist/platforms/',
      files: [
        {
          destination: 'web.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },

    // JavaScript (범용)
    js: {
      transformGroup: 'js',
      buildPath: 'dist/platforms/',
      files: [
        {
          destination: 'js.js',
          format: 'javascript/module',
        },
      ],
    },

    // React Native JSON (rn.ts 수동 파일 보완용)
    rn: {
      transforms: ['attribute/cti', 'name/cti/camel', 'color/hex', 'size/remToSp', 'size/remToPx'],
      buildPath: 'dist/platforms/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
};
