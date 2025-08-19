# Gemini Writer CLI 프롬프트 수정 계획

## 📋 개요

이 문서는 Gemini CLI를 Gemini Writer CLI로 전환하기 위한 프롬프트 시스템 수정 계획을 정리한 것입니다. 기존의 소프트웨어 엔지니어링 중심 프롬프트를 글쓰기 전문가 중심으로 변경하는 전략을 제시합니다.

## 🔍 현재 프롬프트 시스템 분석

### 1. 핵심 시스템 프롬프트 (`packages/core/src/core/prompts.ts`)

**파일 위치**: `/packages/core/src/core/prompts.ts`
**함수**: `getCoreSystemPrompt(userMemory?: string): string`

**현재 페르소나**:
```
"You are an interactive CLI agent specializing in software engineering tasks"
```

**현재 핵심 워크플로우**:
1. **Software Engineering Tasks**: 버그 수정, 기능 추가, 리팩토링, 코드 설명
2. **New Applications**: 프로토타입 구현 및 배포

**현재 핵심 지침**:
- 프로젝트 컨벤션 준수
- 라이브러리/프레임워크 검증
- 코드 스타일 & 구조 모방
- 간결하고 직접적인 CLI 톤
- 안전성 우선

### 2. 개발 가이드라인 (`GEMINI.md`)

**파일 위치**: `/GEMINI.md`

**현재 내용**:
- React/TypeScript 개발 가이드라인
- 테스트 작성 규칙 (Vitest 기반)
- JavaScript/TypeScript 코딩 스타일
- Git 사용법
- 코멘트 정책

### 3. 환경변수 기반 시스템 프롬프트 오버라이드

**시스템**:
- `GEMINI_SYSTEM_MD`: 커스텀 시스템 프롬프트 파일 경로
- `GEMINI_WRITE_SYSTEM_MD`: 시스템 프롬프트를 파일로 출력
- 기본 경로: `.gemini/system.md`

### 4. 계층적 컨텍스트 파일 시스템

**로딩 순서**:
1. **글로벌 컨텍스트**: `~/.gemini/GEMINI.md`
2. **프로젝트 루트 & 상위**: 현재 디렉토리에서 프로젝트 루트까지 상향 검색
3. **하위 디렉토리**: 현재 디렉토리 하위에서 하향 검색

**특징**:
- 여러 파일의 내용이 연결되어 시스템 프롬프트에 추가
- `/memory show`, `/memory refresh` 명령어로 관리

### 5. 도구(Tools) 시스템

**현재 도구들**:
- 파일 작업: `ReadFileTool`, `WriteFileTool`, `EditTool`
- 검색: `GrepTool`, `GlobTool`
- 시스템: `ShellTool`, `LSTool`
- 메모리: `MemoryTool`

## 🎯 글쓰기 중심으로의 전환 계획

### Phase 1: 핵심 시스템 프롬프트 수정

**파일**: `packages/core/src/core/prompts.ts`

#### 1.1 페르소나 변경
**현재**:
```
"You are an interactive CLI agent specializing in software engineering tasks"
```

**변경 후**:
```
"You are an interactive CLI agent specializing in professional writing and content creation"
```

#### 1.2 핵심 지침 수정

**코딩 중심 → 글쓰기 중심으로 변경**:

| 현재 (코딩 중심) | 변경 후 (글쓰기 중심) |
|---|---|
| **Conventions**: 프로젝트 컨벤션 준수 | **Style Guidelines**: 기존 글쓰기 스타일과 톤 준수 |
| **Libraries/Frameworks**: 라이브러리 검증 | **References/Sources**: 참고 자료와 출처 검증 |
| **Style & Structure**: 코드 스타일 모방 | **Writing Style**: 문체, 구조, 서식 패턴 준수 |
| **Idiomatic Changes**: 자연스러운 코드 통합 | **Natural Flow**: 자연스러운 문맥과 흐름 유지 |

#### 1.3 워크플로우 재정의

**현재 워크플로우**:
1. Software Engineering Tasks
2. New Applications

**새로운 워크플로우**:
1. **Writing Tasks**: 작성, 편집, 교정, 리팩토링
2. **Content Creation**: 새로운 글/문서 기획부터 완성까지

#### 1.4 구체적인 워크플로우 단계

**Writing Tasks 워크플로우**:
1. **Understand**: 사용자 요청과 기존 글의 맥락 파악
2. **Plan**: 글쓰기 구조와 접근법 계획
3. **Draft**: 초안 작성
4. **Review**: 내용, 구조, 스타일 검토
5. **Refine**: 최종 수정 및 완성

**Content Creation 워크플로우**:
1. **Requirements**: 목적, 대상 독자, 장르, 분량 파악
2. **Research**: 필요한 정보 수집 및 검증
3. **Structure**: 아웃라인 및 구조 설계
4. **Write**: 섹션별 작성
5. **Polish**: 전체적인 완성도 향상

### Phase 2: GEMINI.md 개발 가이드라인 수정

**파일**: `GEMINI.md`

#### 2.1 글쓰기 가이드라인 추가

**새로운 섹션들**:
- **Writing Conventions**: 문서 작성 규칙
- **Style Guidelines**: 다양한 장르별 스타일 가이드
- **Content Structure**: 문서 구조화 방법
- **Research Methods**: 정보 수집 및 검증 방법
- **Version Control**: 글쓰기 버전 관리

#### 2.2 기존 개발 관련 내용 조정

**유지할 내용**:
- Git 사용법 (글쓰기 프로젝트의 버전 관리용)
- 파일 관리 방법
- 프로젝트 구조 관리

**수정할 내용**:
- React/TypeScript → 글쓰기 도구 및 포맷
- 테스트 작성 → 교정 및 검토 프로세스
- 코딩 스타일 → 글쓰기 스타일

### Phase 3: 글쓰기 특화 도구 추가 계획

#### 3.1 기존 도구 활용법 재정의

**파일 도구들의 글쓰기 용도**:
- `ReadFileTool`: 참고 문서, 기존 글 분석
- `WriteFileTool`: 새 글/문서 작성
- `EditTool`: 글 수정 및 편집
- `GrepTool`: 특정 내용 검색
- `GlobTool`: 관련 문서 찾기

#### 3.2 새로운 글쓰기 도구 개발 계획

**추가 예정 도구들**:
- **StyleAnalysisTool**: 문체 분석
- **ReadabilityTool**: 가독성 검사
- **FactCheckTool**: 사실 확인
- **CitationTool**: 인용 관리
- **OutlineTool**: 아웃라인 생성/관리

### Phase 4: 예제 및 템플릿 업데이트

#### 4.1 프롬프트 예제 수정

**현재 예제들**:
```
user: Refactor the auth logic in src/auth.py
user: Write tests for someFile.ts
user: How do I update the user's profile information?
```

**새로운 예제들**:
```
user: Edit this essay to improve flow and clarity
user: Write an outline for a technical article about AI
user: How can I improve the conclusion of this chapter?
user: Check the citations in this research paper
```

#### 4.2 도구 사용 예제 업데이트

글쓰기 맥락에서의 각 도구 사용법 예제 추가

### Phase 5: 환경변수 및 설정 확장

#### 5.1 글쓰기 특화 설정 추가

**새로운 환경변수들**:
- `GEMINI_WRITER_STYLE`: 기본 글쓰기 스타일 설정
- `GEMINI_DEFAULT_GENRE`: 기본 장르 설정
- `GEMINI_WRITING_TEMPLATES`: 템플릿 디렉토리 설정

#### 5.2 설정 파일 확장

`settings.json`에 글쓰기 관련 설정 추가:
```json
{
  "writingSettings": {
    "defaultStyle": "academic|creative|technical|business",
    "autoCorrect": true,
    "factCheck": true,
    "citationFormat": "APA|MLA|Chicago"
  }
}
```

## 🚀 구현 순서

### 1단계: 핵심 프롬프트 수정 (우선순위: 높음)
- [ ] `prompts.ts`의 기본 시스템 프롬프트 수정
- [ ] 페르소나와 핵심 워크플로우 변경
- [ ] 예제 업데이트

### 2단계: 가이드라인 문서 수정 (우선순위: 높음)
- [ ] `GEMINI.md` 전면 수정
- [ ] 글쓰기 가이드라인 추가
- [ ] 기존 개발 가이드라인 조정

### 3단계: 도구 활용법 재정의 (우선순위: 중간)
- [ ] 기존 도구들의 글쓰기 용도 문서화
- [ ] 도구 설명 및 예제 업데이트

### 4단계: 새로운 도구 개발 (우선순위: 낮음)
- [ ] 글쓰기 특화 도구 설계
- [ ] 순차적 구현

### 5단계: 설정 시스템 확장 (우선순위: 낮음)
- [ ] 글쓰기 관련 설정 추가
- [ ] 환경변수 확장

## 📝 주의사항

### 기존 기능 유지
- 파일 관리 기능은 글쓰기에도 필수적이므로 유지
- Git 기능은 글쓰기 프로젝트 버전 관리용으로 활용
- 기본 CLI 인터페이스는 동일하게 유지

### 호환성 고려
- 기존 설정 파일과의 호환성 유지
- 환경변수 추가 시 기존 변수와 충돌 방지
- 점진적 마이그레이션 지원

### 테스트 계획
- 각 단계별 테스트 케이스 작성
- 기존 기능 회귀 테스트
- 새로운 글쓰기 기능 테스트

## 🎨 기대 효과

### 사용자 경험
- 글쓰기 전문가에게 최적화된 인터페이스
- 체계적인 글쓰기 워크플로우 지원
- 다양한 장르와 스타일 지원

### 기능적 개선
- 기존 도구들의 글쓰기 활용도 극대화
- 글쓰기 특화 새로운 도구들 추가
- 더 정교한 문서 관리 시스템

이 계획에 따라 단계적으로 구현하면 Gemini CLI를 성공적으로 Gemini Writer CLI로 전환할 수 있을 것입니다.
