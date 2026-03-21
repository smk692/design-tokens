# Contributing — @sonmily/design-tokens

손밀리 디자인 토큰 기여 가이드입니다.

## 토큰 추가/수정 방법

### 1. 원시값 변경 (`core.json`)

색상·폰트·스페이싱 등 원시값을 바꿀 때:

```jsonc
// core.json
{
  "color": {
    "brand": {
      "primary": { "value": "#4A7CF7", "type": "color" }
      //              ↑ hex 값만 수정
    }
  }
}
```

**주의사항:**
- 색상은 반드시 WCAG 2.1 AA 대비율 검증 (4.5:1 이상)
- 시니어 팔레트(12색) 변경 시 CPO 리뷰 필수
- 폰트 크기 최솟값: 시니어 본문 22px / 레이블 20px

### 2. 역할 기반 토큰 변경 (`semantic.json`)

컴포넌트/역할 토큰을 추가할 때:

```jsonc
// semantic.json
{
  "semantic": {
    "light": {
      "new-component": {
        "background": { "value": "{color.brand.primary}", "type": "color" },
        "text": { "value": "{color.neutral.0}", "type": "color" }
      }
    },
    "dark": {
      "new-component": {
        // 다크모드 값도 함께 정의
      }
    }
  }
}
```

### 3. React Native 플랫폼 (`platforms/rn.ts`)

RN 플랫폼 토큰 추가 시:
1. `DesignTokens` 또는 `SemanticTokens` 인터페이스 업데이트
2. 실제 값 추가
3. 타입 컴파일 확인: `npm run type-check`

### 4. Web CSS (`platforms/web.css`)

CSS Variable 추가 시 네이밍 규칙 준수:
- `--color-{group}-{name}` (예: `--color-brand-primary`)
- `--font-size-{name}` (예: `--font-size-senior-body`)
- `--spacing-{scale}` (예: `--spacing-4`)

---

## PR 체크리스트

- [ ] `core.json` 수정 시 WCAG 대비율 확인
- [ ] 라이트/다크 모드 둘 다 정의
- [ ] `rn.ts` 타입 동기화
- [ ] `web.css` CSS Variable 추가
- [ ] 버전 업 (`package.json`) — Semantic Versioning 준수
- [ ] `CHANGELOG.md` 업데이트

---

## 버전 관리 (Semantic Versioning)

| 변경 유형 | 버전 | 예시 |
|-----------|------|------|
| 버그 수정, 오타 | Patch (1.1.x) | 색상 값 미세 조정 |
| 토큰 추가 | Minor (1.x.0) | 새 컴포넌트 토큰 |
| 토큰 삭제/이름 변경 | Major (x.0.0) | Breaking change |

---

## 접근성 기준

- **WCAG 2.1 AA 필수** (모든 텍스트 색상)
- 시니어 UX 기준: 터치타겟 56px 이상, 폰트 22px 이상
- 색상 외 정보 전달 수단 병용 (아이콘 + 텍스트)
