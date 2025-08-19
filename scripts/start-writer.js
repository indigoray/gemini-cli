/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { spawn, execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync, mkdirSync } from 'fs';


const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));

// Writer 모드 설정
const writerDir = join(root, 'my_writings');
const env = {
  ...process.env,
  CLI_VERSION: pkg.version,
  DEV: 'true',
  GEMINI_WRITER_MODE: 'pro-writer',
  GEMINI_WORKSPACE_DIR: writerDir,
};

console.log('🚀 Gemini Writer CLI 시작 중...');
console.log(`📂 작업 폴더: ${writerDir}`);

// my_writings 폴더가 없으면 생성
if (!existsSync(writerDir)) {
  console.log('📁 my_writings 폴더 생성 중...');
  mkdirSync(writerDir, { recursive: true });
}

// my_writings 폴더가 없으면 생성
if (!existsSync(writerDir)) {
  console.log('📁 my_writings 폴더 생성 중...');
  mkdirSync(writerDir, { recursive: true });
}

console.log(`✅ 작업 폴더 설정: ${writerDir}`);

// check build status
execSync('node scripts/check-build-status.js', {
  stdio: 'inherit',
  cwd: root,
});

const nodeArgs = [];
let sandboxCommand = undefined;
try {
  sandboxCommand = execSync('node scripts/sandbox_command.js', {
    cwd: root,
  })
    .toString()
    .trim();
} catch {
  // ignore
}

if (process.env.DEBUG && !sandboxCommand) {
  if (process.env.SANDBOX) {
    const port = process.env.DEBUG_PORT || '9229';
    nodeArgs.push(`--inspect-brk=0.0.0.0:${port}`);
  } else {
    nodeArgs.push('--inspect-brk');
  }
}

nodeArgs.push(join(root, 'packages', 'cli'));
nodeArgs.push(...process.argv.slice(2));

if (process.env.DEBUG) {
  env.GEMINI_CLI_NO_RELAUNCH = 'true';
}

console.log('✍️  Professional Writer 모드로 시작...');
console.log('');

const child = spawn('node', nodeArgs, { 
  stdio: 'inherit', 
  env,
  cwd: writerDir  // 여기서도 cwd 설정
});

child.on('close', (code) => {
  process.exit(code);
});
