#!/bin/bash

# Writer CLI 시작 스크립트
echo "🚀 Gemini Writer CLI 시작 중..."

# 작업 디렉토리 설정
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_DIR="$SCRIPT_DIR/my_writings"
export GEMINI_WORKSPACE_DIR="$WORKSPACE_DIR"
export GEMINI_WRITER_MODE=pro-writer

# 워크스페이스 폴더가 없으면 생성 (프로젝트 루트 기준)
if [ ! -d "$WORKSPACE_DIR" ]; then
    echo "📁 my_writings 폴더 생성 중..."
    mkdir -p "$WORKSPACE_DIR"
fi

echo "📂 작업 폴더: $GEMINI_WORKSPACE_DIR"
echo "✍️  Writer 모드: $GEMINI_WRITER_MODE"
echo ""

# CLI 시작
(cd "$SCRIPT_DIR" && npm start)
