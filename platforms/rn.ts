/**
 * @sonmily/design-tokens — React Native (TypeScript)
 * v1.1.0 — 폰트 상향 (본문 22px / 레이블 20px), 타입 안전성 추가
 *
 * 사용법:
 *   import { tokens, getSemanticTokens, SemanticTokens } from '@sonmily/design-tokens/platforms/rn';
 *   const sem: SemanticTokens = getSemanticTokens(isDark);
 */

// ─── 타입 정의 ───────────────────────────────────────────

export interface ColorTokens {
  brand: {
    primary: string;
    secondary: string;
    accent: string;
  };
  neutral: Record<0|50|100|200|300|400|500|600|700|800|900|1000, string>;
  status: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  ai: {
    glowStart: string;
    glowEnd: string;
    surface: string;
    border: string;
  };
  senior: {
    red: string; orange: string; yellow: string; green: string;
    teal: string; blue: string; indigo: string; violet: string;
    pink: string; brown: string; gray: string; dark: string;
  };
}

export interface TypographyTokens {
  fontFamily: { base: string; bold: string };
  fontSize: {
    xs: number; sm: number; md: number; lg: number;
    xl: number; '2xl': number; '3xl': number;
    seniorBody: number;   // 22px — 시니어 본문
    seniorLabel: number;  // 20px — 시니어 레이블
  };
  fontWeight: { regular: string; medium: string; semibold: string; bold: string };
  lineHeight: { tight: number; normal: number; relaxed: number; senior: number };
}

export interface SpacingTokens {
  0: number; 1: number; 2: number; 3: number; 4: number;
  5: number; 6: number; 8: number; 10: number; 12: number;
  16: number; 20: number;
}

export interface TouchTargetTokens {
  minimum: number;   // 44px — WCAG 최소
  senior: number;    // 56px — 시니어 권장
  seniorCta: number; // 64px — 시니어 CTA
}

export interface SemanticTokens {
  bgDefault: string;
  bgSubtle: string;
  bgAi: string;
  fgDefault: string;
  fgMuted: string;
  fgDisabled: string;
  borderDefault: string;
  interactivePrimary: string;
  interactiveText: string;
  interactiveDanger: string;
  seniorText: string;
  seniorBtnBg: string;
  seniorFocusRing: string;
}

export interface DesignTokens {
  color: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: {
    none: number; sm: number; md: number; lg: number;
    xl: number; '2xl': number; full: number;
  };
  touchTarget: TouchTargetTokens;
  aiGradient: {
    colors: [string, string];
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  semantic: {
    light: SemanticTokens;
    dark: SemanticTokens;
  };
}

// ─── 토큰 값 ─────────────────────────────────────────────

export const tokens: DesignTokens = {
  color: {
    brand: {
      primary:   '#4A7CF7',
      secondary: '#6B4FBB',
      accent:    '#00C9A7',
    },
    neutral: {
      0:    '#FFFFFF',
      50:   '#F8F9FA',
      100:  '#F1F3F5',
      200:  '#E9ECEF',
      300:  '#DEE2E6',
      400:  '#CED4DA',
      500:  '#ADB5BD',
      600:  '#868E96',
      700:  '#495057',
      800:  '#343A40',
      900:  '#212529',
      1000: '#000000',
    },
    status: {
      success: '#40C057',
      warning: '#FCC419',
      danger:  '#FA5252',
      info:    '#4DABF7',
    },
    ai: {
      glowStart: '#4A7CF7',
      glowEnd:   '#9C6FFF',
      surface:   '#EEF3FF',
      border:    '#748FFC',
    },
    senior: {
      // BOKHAUS 12색 팔레트 — WCAG 2.1 AA 이상
      red:    '#E03131',
      orange: '#E8590C',
      yellow: '#F08C00',
      green:  '#2F9E44',
      teal:   '#0C8599',
      blue:   '#1971C2',
      indigo: '#3B5BDB',
      violet: '#6741D9',
      pink:   '#C2255C',
      brown:  '#7C5C3E',
      gray:   '#495057',
      dark:   '#212529',
    },
  },

  typography: {
    fontFamily: {
      base: 'NotoSansKR-Regular',
      bold: 'NotoSansKR-Bold',
    },
    fontSize: {
      xs:          12,
      sm:          14,
      md:          16,
      lg:          18,
      xl:          20,
      '2xl':       24,
      '3xl':       30,
      seniorBody:  22,  // ✅ CTO 피드백 반영: 20→22px
      seniorLabel: 20,  // ✅ CTO 피드백 반영: 18→20px
    },
    fontWeight: {
      regular:  '400',
      medium:   '500',
      semibold: '600',
      bold:     '700',
    },
    lineHeight: {
      tight:   1.2,
      normal:  1.5,
      relaxed: 1.75,
      senior:  1.8,   // 시니어 가독성 최적 — 유지
    },
  },

  spacing: {
    0:  0,
    1:  4,
    2:  8,
    3:  12,
    4:  16,
    5:  20,
    6:  24,
    8:  32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
  },

  borderRadius: {
    none:  0,
    sm:    4,
    md:    8,
    lg:    12,
    xl:    16,
    '2xl': 24,
    full:  9999,
  },

  touchTarget: {
    minimum:   44,   // WCAG 최소
    senior:    56,   // 시니어 권장
    seniorCta: 64,   // 시니어 CTA — ✅ 유지
  },

  // AI 글로우: LinearGradient 연동용 (react-native-linear-gradient)
  aiGradient: {
    colors: ['#4A7CF7', '#9C6FFF'],
    start:  { x: 0, y: 0 },
    end:    { x: 1, y: 1 },
  },

  semantic: {
    light: {
      bgDefault:          '#FFFFFF',
      bgSubtle:           '#F8F9FA',
      bgAi:               '#EEF3FF',
      fgDefault:          '#212529',
      fgMuted:            '#868E96',
      fgDisabled:         '#CED4DA',
      borderDefault:      '#E9ECEF',
      interactivePrimary: '#4A7CF7',
      interactiveText:    '#FFFFFF',
      interactiveDanger:  '#FA5252',
      seniorText:         '#212529',
      seniorBtnBg:        '#4A7CF7',
      seniorFocusRing:    '#4A7CF7',
    },
    dark: {
      bgDefault:          '#212529',
      bgSubtle:           '#343A40',
      bgAi:               '#1A1F3A',
      fgDefault:          '#F8F9FA',
      fgMuted:            '#CED4DA',
      fgDisabled:         '#868E96',
      borderDefault:      '#495057',
      interactivePrimary: '#6E9EFF',
      interactiveText:    '#212529',
      interactiveDanger:  '#FF7B7B',
      seniorText:         '#F8F9FA',
      seniorBtnBg:        '#6E9EFF',
      seniorFocusRing:    '#82AFFF',
    },
  },
};

// ─── 헬퍼 ────────────────────────────────────────────────

/**
 * 현재 테마에 따른 시맨틱 토큰 반환
 * @param isDark - useColorScheme() === 'dark'
 * @returns SemanticTokens (타입 완전 안전)
 */
export const getSemanticTokens = (isDark: boolean): SemanticTokens =>
  isDark ? tokens.semantic.dark : tokens.semantic.light;

export default tokens;
