// Figma Plugin — Foundation 페이지 색상 팔레트 생성
// SonMily Design System v1.1.0
// 실행: Figma > Plugins > Development > Run once

const colors = [
  {
    "name": "Brand/Primary",
    "hex": "#4A7CF7",
    "desc": "Primary Blue"
  },
  {
    "name": "Brand/Secondary",
    "hex": "#6B4FBB",
    "desc": "Secondary Purple"
  },
  {
    "name": "Brand/Accent",
    "hex": "#00C9A7",
    "desc": "Accent Teal"
  },
  {
    "name": "Status/Success",
    "hex": "#40C057"
  },
  {
    "name": "Status/Warning",
    "hex": "#FCC419"
  },
  {
    "name": "Status/Danger",
    "hex": "#FA5252"
  },
  {
    "name": "Status/Info",
    "hex": "#4DABF7"
  },
  {
    "name": "AI/Glow Start",
    "hex": "#4A7CF7",
    "desc": "AI Gradient Start"
  },
  {
    "name": "AI/Glow End",
    "hex": "#9C6FFF",
    "desc": "AI Gradient End"
  },
  {
    "name": "AI/Surface",
    "hex": "#EEF3FF"
  },
  {
    "name": "Senior/Red",
    "hex": "#E03131"
  },
  {
    "name": "Senior/Orange",
    "hex": "#E8590C"
  },
  {
    "name": "Senior/Yellow",
    "hex": "#F08C00"
  },
  {
    "name": "Senior/Green",
    "hex": "#2F9E44"
  },
  {
    "name": "Senior/Teal",
    "hex": "#0C8599"
  },
  {
    "name": "Senior/Blue",
    "hex": "#1971C2"
  },
  {
    "name": "Senior/Indigo",
    "hex": "#3B5BDB"
  },
  {
    "name": "Senior/Violet",
    "hex": "#6741D9"
  },
  {
    "name": "Senior/Pink",
    "hex": "#C2255C"
  },
  {
    "name": "Senior/Brown",
    "hex": "#7C5C3E"
  },
  {
    "name": "Senior/Gray",
    "hex": "#495057"
  },
  {
    "name": "Senior/Dark",
    "hex": "#212529"
  }
];

async function main() {
  // 현재 페이지에 Foundation 프레임 생성
  const frame = figma.createFrame();
  frame.name = '🎨 Color Foundation — @sonmily/design-tokens v1.1.0';
  frame.resize(1440, 900);
  frame.x = 0;
  frame.y = 0;
  frame.fills = [{ type: 'SOLID', color: { r: 0.973, g: 0.976, b: 0.980 } }]; // #F8F9FA

  // 제목 텍스트
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  
  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.characters = '@sonmily/design-tokens — Color Foundation';
  title.fontSize = 28;
  title.fills = [{ type: 'SOLID', color: { r: 0.13, g: 0.15, b: 0.16 } }];
  title.x = 40;
  title.y = 40;
  frame.appendChild(title);

  const subtitle = figma.createText();
  subtitle.fontName = { family: 'Inter', style: 'Regular' };
  subtitle.characters = 'BOKHAUS 시니어 케어 디자인 시스템 | WCAG 2.1 AA | v1.1.0';
  subtitle.fontSize = 14;
  subtitle.fills = [{ type: 'SOLID', color: { r: 0.29, g: 0.33, b: 0.38 } }];
  subtitle.x = 40;
  subtitle.y = 80;
  frame.appendChild(subtitle);

  // 색상 그룹 분리
  const groups = {};
  for (const c of colors) {
    const group = c.name.split('/')[0];
    if (!groups[group]) groups[group] = [];
    groups[group].push(c);
  }

  let yOffset = 130;
  
  for (const [groupName, groupColors] of Object.entries(groups)) {
    // 그룹 레이블
    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Bold' };
    label.characters = groupName.toUpperCase();
    label.fontSize = 11;
    label.letterSpacing = { value: 1.5, unit: 'PIXELS' };
    label.fills = [{ type: 'SOLID', color: { r: 0.51, g: 0.55, b: 0.60 } }];
    label.x = 40;
    label.y = yOffset;
    frame.appendChild(label);
    
    yOffset += 24;
    
    let xOffset = 40;
    for (const c of groupColors) {
      const rgb = hexToRgb01(c.hex);
      
      // 스워치 사각형
      const swatch = figma.createRectangle();
      swatch.name = c.name;
      swatch.resize(80, 60);
      swatch.x = xOffset;
      swatch.y = yOffset;
      swatch.cornerRadius = 8;
      swatch.fills = [{ type: 'SOLID', color: rgb }];
      
      // 스타일 등록 (Figma Styles)
      const style = figma.createPaintStyle();
      style.name = c.name;
      style.paints = [{ type: 'SOLID', color: rgb }];
      swatch.fillStyleId = style.id;
      
      frame.appendChild(swatch);
      
      // 색상 이름 레이블
      const nameText = figma.createText();
      nameText.fontName = { family: 'Inter', style: 'Regular' };
      nameText.characters = c.name.split('/').pop();
      nameText.fontSize = 10;
      nameText.fills = [{ type: 'SOLID', color: { r: 0.29, g: 0.33, b: 0.38 } }];
      nameText.x = xOffset;
      nameText.y = yOffset + 64;
      frame.appendChild(nameText);
      
      // hex 값
      const hexText = figma.createText();
      hexText.fontName = { family: 'Inter', style: 'Regular' };
      hexText.characters = c.hex;
      hexText.fontSize = 9;
      hexText.fills = [{ type: 'SOLID', color: { r: 0.60, g: 0.63, b: 0.67 } }];
      hexText.x = xOffset;
      hexText.y = yOffset + 76;
      frame.appendChild(hexText);
      
      xOffset += 96;
      if (xOffset > 1360) {
        xOffset = 40;
        yOffset += 110;
      }
    }
    
    yOffset += 110;
  }

  figma.currentPage.appendChild(frame);
  figma.viewport.scrollAndZoomIntoView([frame]);
  
  console.log('✅ Foundation 페이지 생성 완료!');
  console.log('생성된 Color Styles:', colors.length + '개');
  
  figma.closePlugin('🎨 Color Foundation 생성 완료! ' + colors.length + '개 색상 스타일 등록');
}

function hexToRgb01(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0,2), 16) / 255,
    g: parseInt(h.slice(2,4), 16) / 255,
    b: parseInt(h.slice(4,6), 16) / 255,
  };
}

main().catch(err => {
  figma.closePlugin('❌ 오류: ' + err.message);
});
