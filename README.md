# Gemini Writer CLI

[![Gemini CLI CI](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml)

![Gemini CLI Screenshot](./docs/assets/gemini-screenshot.png)

**Gemini Writer CLI**는 작가와 글쓰기 전문가를 위한 AI 기반 커맨드라인 도구입니다. 이 프로젝트는 Google의 Gemini CLI를 기반으로 하여, 코딩 중심에서 글쓰기 중심으로 특화된 AI 어시스턴트로 발전시킨 포크 프로젝트입니다.

## 프로젝트 개요

Gemini Writer CLI는 다음과 같은 철학으로 개발되었습니다:

- **텍스트 중심의 공통 작업**: 코딩과 글쓰기 모두 텍스트를 주요 대상으로 다루기 때문에, 텍스트 편집, 구조화, 버전 관리 등 비슷한 툴셋을 필요로 합니다.
- **체계적 사고의 유사성**: 두 작업 모두 체계적인 사고, 논리적 구조화, 그리고 반복적인 개선 과정을 필요로 합니다.
- **기존 도구의 활용**: Gemini CLI의 강력한 기본 기능을 유지하면서, 글쓰기에 특화된 기능을 추가했습니다.
- **공통 기능의 재활용**: Gemini CLI의 코드 작성, 수정, repository 및 history 관리, 프로젝트 구조 관리 등의 기능들이 모두 글쓰기 프로젝트에도 직접적으로 유용한 공통 기능입니다.
- **전문적인 글쓰기 지원**: 단순한 텍스트 생성을 넘어서, 전문적인 글쓰기 워크플로우를 지원합니다.

## 주요 기능

Gemini Writer CLI를 통해 다음과 같은 작업을 수행할 수 있습니다:

- **대용량 텍스트 분석 및 편집**: Gemini의 1M 토큰 컨텍스트 윈도우를 활용하여 긴 문서나 여러 문서를 동시에 처리
- **다양한 글쓰기 장르 지원**: 소설, 에세이, 기술 문서, 학술 논문, 비즈니스 문서 등 다양한 형태의 글쓰기 지원
- **구조화된 글쓰기 워크플로우**: 기획 → 아웃라인 → 초안 → 수정 → 완성의 체계적인 글쓰기 과정 가이드
- **스타일 일관성 유지**: 기존 작품의 문체와 톤을 분석하여 일관된 스타일로 글쓰기 지원
- **연구 및 팩트체크**: Google Search 도구를 활용한 실시간 정보 검색 및 검증
- **다국어 글쓰기**: 번역, 현지화, 다언어 콘텐츠 제작 지원

## 기존 Gemini CLI와의 차이점

- **전문 작가 페르소나**: 글쓰기 전문가의 관점에서 조언하고 작업을 수행
- **글쓰기 특화 프롬프트**: 창작, 편집, 교정에 특화된 시스템 프롬프트와 지침
- **글쓰기 워크플로우**: 체계적인 글쓰기 과정을 지원하는 단계별 가이드
- **글쓰기 도구**: 문체 분석, 가독성 검사, 구조 개선 등 글쓰기에 특화된 추가 도구

---

## 원본 Gemini CLI 정보

> 아래는 원본 Gemini CLI의 문서입니다. 기본적인 설치 및 사용법은 동일하게 적용됩니다.

This repository contains the Gemini CLI, a command-line AI workflow tool that connects to your
tools, understands your code and accelerates your workflows.

With the Gemini CLI you can:

- Query and edit large codebases in and beyond Gemini's 1M token context window.
- Generate new apps from PDFs or sketches, using Gemini's multimodal capabilities.
- Automate operational tasks, like querying pull requests or handling complex rebases.
- Use tools and MCP servers to connect new capabilities, including [media generation with Imagen,
  Veo or Lyria](https://github.com/GoogleCloudPlatform/vertex-ai-creative-studio/tree/main/experiments/mcp-genmedia)
- Ground your queries with the [Google Search](https://ai.google.dev/gemini-api/docs/grounding)
  tool, built in to Gemini.

## Quickstart

1. **Prerequisites:** Ensure you have [Node.js version 18](https://nodejs.org/en/download) or higher installed.
2. **Run the CLI:** Execute the following command in your terminal:

   ```bash
   npx https://github.com/google-gemini/gemini-cli
   ```

   Or install it with:

   ```bash
   npm install -g @google/gemini-cli
   ```

3. **Pick a color theme**
4. **Authenticate:** When prompted, sign in with your personal Google account. This will grant you up to 60 model requests per minute and 1,000 model requests per day using Gemini 2.5 Pro.

You are now ready to use the Gemini CLI!

### For advanced use or increased limits:

If you need to use a specific model or require a higher request capacity, you can use an API key:

1. Generate a key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Set it as an environment variable in your terminal. Replace `YOUR_API_KEY` with your generated key.

   ```bash
   export GEMINI_API_KEY="YOUR_API_KEY"
   ```

For other authentication methods, including Google Workspace accounts, see the [authentication](./docs/cli/authentication.md) guide.

## Examples

Once the CLI is running, you can start interacting with Gemini from your shell.

You can start a project from a new directory:

```sh
$ cd new-project/
$ gemini
> Write me a Gemini Discord bot that answers questions using a FAQ.md file I will provide
```

Or work with an existing project:

```sh
$ git clone https://github.com/google-gemini/gemini-cli
$ cd gemini-cli
$ gemini
> Give me a summary of all of the changes that went in yesterday
```

### Next steps

- Learn how to [contribute to or build from the source](./CONTRIBUTING.md).
- Explore the available **[CLI Commands](./docs/cli/commands.md)**.
- If you encounter any issues, review the **[Troubleshooting guide](./docs/troubleshooting.md)**.
- For more comprehensive documentation, see the [full documentation](./docs/index.md).
- Take a look at some [popular tasks](#popular-tasks) for more inspiration.

## Popular tasks

### Explore a new codebase

Start by `cd`ing into an existing or newly-cloned repository and running `gemini`.

```text
> Describe the main pieces of this system's architecture.
```

```text
> What security mechanisms are in place?
```

### Work with your existing code

```text
> Implement a first draft for GitHub issue #123.
```

```text
> Help me migrate this codebase to the latest version of Java. Start with a plan.
```

### Automate your workflows

Use MCP servers to integrate your local system tools with your enterprise collaboration suite.

```text
> Make me a slide deck showing the git history from the last 7 days, grouped by feature and team member.
```

```text
> Make a full-screen web app for a wall display to show our most interacted-with GitHub issues.
```

### Interact with your system

```text
> Convert all the images in this directory to png, and rename them to use dates from the exif data.
```

```text
> Organise my PDF invoices by month of expenditure.
```

## Gemini APIs

This project leverages the Gemini APIs to provide AI capabilities. For details on the terms of service governing the Gemini API, please refer to the terms for the access mechanism you are using:

- [Gemini API key](https://ai.google.dev/gemini-api/terms)
- [Gemini Code Assist](https://developers.google.com/gemini-code-assist/resources/privacy-notices)
- [Vertex AI](https://cloud.google.com/terms/service-terms)
