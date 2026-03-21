# API Reference — @sonmily/design-tokens

## 설치

```bash
# npm (향후 npm org 생성 후)
npm install @sonmily/design-tokens

# 현재: GitHub에서 직접
npm install github:smk692/design-tokens
```

---

## Web (CSS Variables)

```css
/* 전역 import */
@import '@sonmily/design-tokens/platforms/web';
```

### 색상 변수

```css
/* 브랜드 */
color: var(--color-brand-primary);    /* #4A7CF7 */
color: var(--color-brand-secondary);  /* #6B4FBB */
color: var(--color-brand-accent);     /* #00C9A7 */

/* 상태 */
color: var(--color-status-success);   /* #40C057 */
color: var(--color-status-warning);   /* #FCC419 */
color: var(--color-status-danger);    /* #FA5252 */

/* AI 비주얼 언어 */
background: var(--color-ai-surface);     /* #EEF3FF */
border-color: var(--color-ai-border);    /* #748FFC */
box-shadow: var(--shadow-ai-glow);       /* 0 0 20px rgba(74,124,247,0.35) */

/* BOKHAUS 시니어 팔레트 */
color: var(--color-senior-blue);     /* #1971C2 */
color: var(--color-senior-green);    /* #2F9E44 */
```

### 타이포그래피

```css
/* 시니어 전용 */
font-size: var(--font-size-senior-body);   /* 22px */
font-size: var(--font-size-senior-label);  /* 20px */
line-height: var(--line-height-senior);    /* 1.8 */

/* 기본 스케일 */
font-size: var(--font-size-3xl);  /* 30px */
font-size: var(--font-size-2xl);  /* 24px */
font-size: var(--font-size-xl);   /* 20px */
font-size: var(--font-size-lg);   /* 18px */
font-size: var(--font-size-md);   /* 16px */
```

### 스페이싱

```css
padding: var(--spacing-4);   /* 16px */
margin: var(--spacing-6);    /* 24px */
gap: var(--spacing-2);       /* 8px */
```

### 다크모드

```css
/* 자동 (시스템 설정) */
@media (prefers-color-scheme: dark) { ... }

/* 수동 토글 */
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

### 시니어 테마

```css
/* 시니어 사용자 대상 오버라이드 */
document.documentElement.setAttribute('data-theme', 'senior');
```

---

## React Native (TypeScript)

```typescript
import { tokens, getSemanticTokens } from '@sonmily/design-tokens/platforms/rn';
```

### 기본 사용

```typescript
import { tokens } from '@sonmily/design-tokens/platforms/rn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.color.neutral[50].value,
    padding: tokens.spacing[4].value,
  },
  button: {
    height: tokens.touchTarget.senior.value,       // 56
    borderRadius: tokens.borderRadius.lg.value,    // 12
    backgroundColor: tokens.color.brand.primary.value,
  },
});
```

### 다크모드

```typescript
import { getSemanticTokens } from '@sonmily/design-tokens/platforms/rn';

function MyComponent() {
  const isDark = useColorScheme() === 'dark';
  const t = getSemanticTokens(isDark);  // 타입 안전

  return (
    <View style={{ backgroundColor: t.background.default }}>
      <Text style={{ color: t.text.primary, fontSize: t.fontSize.seniorBody }}>
        건강한 하루를 시작하세요
      </Text>
    </View>
  );
}
```

### AI 그라디언트

```typescript
import { tokens } from '@sonmily/design-tokens/platforms/rn';
import LinearGradient from 'react-native-linear-gradient';

// AI 콘텐츠 영역
<LinearGradient
  colors={tokens.color.ai.aiGradient.colors}
  style={styles.aiContainer}
>
  <Text>AI 응답</Text>
</LinearGradient>
```

### 시니어 접근성 체크리스트

```typescript
const t = getSemanticTokens(false);

// ✅ 터치타겟 최소값 준수
const buttonHeight = tokens.touchTarget.senior.value;    // 56px
const ctaHeight = tokens.touchTarget['senior-cta'].value; // 64px

// ✅ 폰트 크기
const bodySize = tokens.typography.fontSize['senior-body'].value;   // 22
const labelSize = tokens.typography.fontSize['senior-label'].value; // 20
const lineHeight = tokens.typography.lineHeight.senior.value;       // 1.8
```

---

## 원시값 직접 접근 (JSON)

```javascript
const core = require('@sonmily/design-tokens/core');
const semantic = require('@sonmily/design-tokens/semantic');

// 색상
core.color.brand.primary.value;   // "#4A7CF7"
core.color.senior.blue.value;     // "#1971C2"

// 스페이싱
core.spacing[4].value;            // "16"

// 터치타겟
core.touchTarget.senior.value;    // "56"
```

---

## Figma Variables 동기화

```bash
# Figma 파일 URL에서 키 복사:
# https://www.figma.com/file/XXXXXXXX/파일명
#                              ^^^^^^^^

FIGMA_TOKEN=figd_xxx \
FIGMA_FILE_KEY=XXXXXXXX \
node sync-to-figma.js

# 동기화 항목:
# - Color Variables: 45개 (Brand/Status/AI/Senior/Neutral)
# - Number Variables: 28개 (Spacing/FontSize/TouchTarget/BorderRadius)
```

---

## 링크

- 📦 GitHub: https://github.com/smk692/design-tokens
- 🎨 토큰 시각화: https://smk692.github.io/design-tokens
- 📋 기여 가이드: [CONTRIBUTING.md](./CONTRIBUTING.md)
- 📝 변경 이력: [CHANGELOG.md](./CHANGELOG.md)
