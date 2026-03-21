# Changelog

All notable changes to `@sonmily/design-tokens` will be documented here.

Format: [Semantic Versioning](https://semver.org/)

---

## [1.1.0] — 2026-03-22

### Added
- `docs/index.html` — 디자인 토큰 시각화 문서 (색상 팔레트, 타이포, 스페이싱, 터치타겟)
- `sync-to-figma.js` — Figma Variables 자동 동기화 스크립트
- `sd.config.js` — Style Dictionary v4 빌드 설정 (Web/RN/JS 플랫폼)
- `CONTRIBUTING.md`, `CHANGELOG.md`, `API.md` — 기여 가이드 및 문서
- `LICENSE` — MIT 라이선스

### Changed
- 시니어 폰트 상향: 본문 `20px → 22px`, 레이블 `18px → 20px` (CTO 리뷰 반영)
- `platforms/rn.js → rn.ts` 전환 (TypeScript 완전 타입 정의)
- `license`: `UNLICENSED → MIT` (Public repo 기준)
- `publishConfig.access`: `restricted → public`

### Fixed
- `rn.ts` `getSemanticTokens` 헬퍼 타입 안전성 강화

---

## [1.0.0] — 2026-03-21

### Added
- `core.json` — 원시 토큰 (색상, 타이포그래피, 스페이싱, 터치타겟, 그림자)
  - Brand 3색, Neutral 12단계, Status 4색, AI 4색, Senior 12색 팔레트
  - 8px 스페이싱 그리드
  - WCAG 2.1 AA 검증 완료
- `semantic.json` — 역할 기반 토큰 (라이트/다크 모드 분리)
  - 컴포넌트 레벨 토큰: `button-senior`, `ai-badge` 등
- `platforms/web.css` — CSS Variables
  - `prefers-color-scheme` + `[data-theme]` 이중 지원
  - `[data-theme="senior"]` 시니어 오버라이드
- `platforms/rn.ts` — React Native TypeScript
  - `SemanticTokens`, `DesignTokens` 인터페이스
  - `getSemanticTokens(isDark: boolean)` 헬퍼
  - `aiGradient` (LinearGradient 연동용)
- `package.json` — `@sonmily/design-tokens` npm 패키지 초기 설정

---

## 로드맵

### [1.2.0] — 예정 (2주차)
- Style Dictionary v4 파이프라인 구축 (CTO)
- TypeScript Declaration 자동 생성
- GitHub Actions CI/CD (npm 자동 배포)
- JSON Schema 출력 (VSCode 자동완성)

### [2.0.0] — 예정 (Storybook 연동)
- Storybook + Chromatic 셋업
- 컴포넌트 레벨 시각화
- 청첩장 CSS Variables 마이그레이션
