#!/bin/bash

# Writer CLI 시작 스크립트
echo "🚀 Gemini Writer CLI 시작 중..."

# 작업 디렉토리 설정
export GEMINI_WORKSPACE_DIR=./my_writings
export GEMINI_WRITER_MODE=pro-writer

# my_writings 폴더로 이동 (현재 프로젝트 폴더 내)
cd ./my_writings

# 폴더가 없으면 생성
if [ ! -d "./my_writings" ]; then
    echo "📁 my_writings 폴더 생성 중..."
    mkdir -p ./my_writings
fi

echo "📂 작업 폴더: $(pwd)"
echo "✍️  Writer 모드: $GEMINI_WRITER_MODE"
echo ""

# CLI 시작
npm start
