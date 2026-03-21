# @sonmily/design-tokens

손밀리 디자인 시스템 토큰 — 플랫폼 중립 원시값에서 플랫폼별 산출물을 자동 생성합니다.

## 구조

```
design-tokens/
├── core.json        # 원시값 (색상·타이포·스페이싱·터치타겟)
├── semantic.json    # 역할 기반 토큰 (라이트/다크, 컴포넌트)
├── platforms/
│   ├── web.css      # CSS Variables (Next.js / 청첩장)
│   └── rn.js        # React Native StyleSheet (BOKHAUS / 출퇴근앱)
└── README.md
```

## 핵심 설계 원칙

### 1. 3계층 토큰
- **Primitive** (`core.json`): `#4A7CF7` — 의미 없는 원시값
- **Semantic** (`semantic.json`): `interactive.primary` — 역할 기반
- **Component**: `button-senior.min-height` — 컴포넌트 전용

### 2. AI 비주얼 언어
| 속성 | Web | React Native |
|------|-----|-------------|
| 글로우 | `box-shadow: var(--shadow-ai-glow)` | `LinearGradient` + 불투명도 |
| 그라디언트 | `linear-gradient(135deg, ...)` | `react-native-linear-gradient` |
| 애니메이션 | CSS animation / Framer Motion | 정적 버전 (성능 최적화) |

### 3. 시니어 접근성 (BOKHAUS)
- 터치 타겟 최소 **56px** (권장) / CTA **64px**
- 폰트 최소 **18px** (레이블) / **20px** (본문)
- 줄간격 **1.8** (가독성 최적)
- 12색 팔레트 — 모두 WCAG 2.1 AA 이상 (4.5:1+)
- 다크모드: 순수 검정(`#000000`) 대신 `#1A1A2E` 사용

### 4. 다크모드 전략
- CSS: `prefers-color-scheme` + `[data-theme="dark"]` 둘 다 지원
- RN: `useColorScheme()` + `getSemanticTokens(isDark)` 헬퍼

## 사용법

### Web (Next.js / Tailwind)
```css
/* globals.css */
@import '@sonmily/design-tokens/platforms/web.css';
```

```jsx
// tailwind.config.js에 CSS Variable 연결
colors: {
  primary: 'var(--interactive-primary)',
  'ai-surface': 'var(--bg-ai)',
}
```

### React Native (BOKHAUS / 출퇴근앱)
```js
import { tokens, getSemanticTokens } from '@sonmily/design-tokens/platforms/rn';
import { useColorScheme } from 'react-native';

const isDark = useColorScheme() === 'dark';
const sem = getSemanticTokens(isDark);

const styles = StyleSheet.create({
  seniorBtn: {
    backgroundColor: sem.seniorBtnBg,
    minHeight: tokens.touchTarget.seniorCta,  // 64px
    borderRadius: tokens.borderRadius.xl,
    paddingHorizontal: tokens.spacing[8],
  }
});
```

## 향후 계획 (Style Dictionary 빌드)
2주차에 CTO님이 Style Dictionary 파이프라인을 구축하면 이 파일들은 자동 생성됩니다.
현재는 CPO가 수작업으로 초안을 작성한 버전입니다.
