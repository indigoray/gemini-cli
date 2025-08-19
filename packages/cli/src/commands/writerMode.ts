import { SlashCommand } from '../ui/commands/types.js';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { CommandKind, CommandContext } from '../ui/commands/types.js';

export const writerModeCommand: SlashCommand = {
  name: 'mode',
  altNames: ['writer-mode', 'wm'],
  description: 'Switch between different writing modes (pro-writer, ghostwriter, novel-auto)',
  kind: CommandKind.BUILT_IN,
  
  action: async (context: CommandContext, args: string) => {
    const argsArray = args.trim().split(/\s+/);
    
    if (!argsArray.length || argsArray[0] === 'show') {
      return {
        type: 'message',
        messageType: 'info',
        content: showCurrentMode()
      };
    }
    
    if (argsArray[0] === 'list') {
      return {
        type: 'message',
        messageType: 'info',
        content: listAvailableModes()
      };
    }
    
    const mode = argsArray[0];
    const options = parseOptions(argsArray.slice(1));
    
    const result = await switchMode(mode, options);
    return {
      type: 'message',
      messageType: 'info',
      content: result
    };
  }
};

function showCurrentMode(): string {
  const currentMode = process.env['GEMINI_WRITER_MODE'] || 'pro-writer';
  const modeInfo = getModeInfo(currentMode);
  
  return `
📝 **Current Writing Mode: ${currentMode.toUpperCase()}**

${modeInfo.description}

**Available Tools:**
${modeInfo.tools.map((tool: string) => `- ${tool}`).join('\n')}

**Current Settings:**
- Style Guide: ${process.env['GEMINI_PRO_STYLE_GUIDE'] || 'default'}
- Language: ${process.env['GEMINI_WRITER_LANG'] || 'ko'}
- Safety Level: ${process.env['GEMINI_WRITER_SAFETY'] || 'moderate'}

Use \`/mode [mode-name]\` to switch modes
Use \`/mode list\` to see all available modes
`;
}

function listAvailableModes(): string {
  return `
📚 **Available Writing Modes:**

1. **pro-writer** - Professional Writer Assistant
   - Literary expertise and research tools
   - Citation management and style guides
   - Professional publishing workflows

2. **ghostwriter** - Collaborative Writing
   - Voice analysis and mimicry
   - Interview-based content extraction
   - Safety filters and collaboration tools

3. **novel-auto** - Automated Novel Generation
   - World-building and continuity management
   - Character development and plot generation
   - Knowledge graph-based story consistency

**Usage:**
\`/mode [mode-name] [options]\`

**Examples:**
\`/mode pro-writer --style chicago --genre mystery\`
\`/mode ghostwriter --profile client-voice.json\`
\`/mode novel-auto --world eldoria.json\`
`;
}

async function switchMode(mode: string, options: Record<string, string>): Promise<string> {
  const validModes = ['pro-writer', 'ghostwriter', 'novel-auto'];
  
  if (!validModes.includes(mode)) {
    return `❌ Invalid mode: ${mode}\n\n${listAvailableModes()}`;
  }
  
  // 환경변수 설정
  process.env['GEMINI_WRITER_MODE'] = mode;
  
  // 모드별 추가 설정
  const modeConfig = await configureMode(mode, options);
  
  // 설정 파일 업데이트 (선택사항)
  await updateSettingsFile(mode, options);
  
  return `
✅ **Mode switched to: ${mode.toUpperCase()}**

${modeConfig.description}

**Active Settings:**
${Object.entries(modeConfig.settings).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

**Available Commands:**
${modeConfig.commands.map((cmd: string) => `- ${cmd}`).join('\n')}

**Tip:** Use \`/mode show\` to see current mode details
`;
}

async function configureMode(mode: string, options: Record<string, string>): Promise<any> {
  const configs: Record<string, any> = {
    'pro-writer': {
      description: 'Professional writing mode activated. You now have access to literary expertise, research tools, and publishing workflows.',
      settings: {
        'Style Guide': options['style'] || 'chicago',
        'Genre': options['genre'] || 'general',
        'Citation Format': options['cite'] || 'chicago',
        'Fact Check': 'enabled'
      },
      commands: [
        '/research [topic] - Research and fact-check',
        '/outline [structure] - Create plot outlines',
        '/cite [source] - Manage citations',
        '/export [format] - Export to various formats'
      ]
    },
    'ghostwriter': {
      description: 'Ghostwriting mode activated. You can now analyze voices, conduct interviews, and collaborate on content creation.',
      settings: {
        'Voice Profile': options['profile'] || 'default',
        'Interview Depth': options['depth'] || 'comprehensive',
        'Safety Filters': 'enabled',
        'Collaboration': 'enabled'
      },
      commands: [
        '/voice learn [samples] - Learn client voice',
        '/interview [topics] - Start content interview',
        '/draft [style] - Create collaborative drafts',
        '/safety check - Verify content safety'
      ]
    },
    'novel-auto': {
      description: 'Automated novel generation mode activated. You can now build worlds, manage continuity, and generate story content.',
      settings: {
        'World Format': options['world'] || 'json',
        'Continuity Check': 'strict',
        'Character Tracking': 'enabled',
        'Plot Generation': 'enabled'
      },
      commands: [
        '/world import [source] - Import world settings',
        '/world validate - Check continuity',
        '/character new [type] - Create characters',
        '/story generate [type] - Generate story content'
      ]
    }
  };
  
  return configs[mode] || configs['pro-writer'];
}

function parseOptions(args: string[]): Record<string, string> {
  const options: Record<string, string> = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
      options[key] = value;
      if (value !== 'true') i++; // Skip value if it was consumed
    }
  }
  
  return options;
}

async function updateSettingsFile(mode: string, options: Record<string, string>): Promise<void> {
  // 사용자 설정 파일에 모드 정보 저장 (선택사항)
  const settingsPath = path.join(os.homedir(), '.gemini', 'writer-settings.json');
  
  try {
    let settings: any = {};
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    }
    
    settings.currentMode = mode;
    settings.modeOptions = options;
    settings.lastUpdated = new Date().toISOString();
    
    // 디렉토리 생성
    const dir = path.dirname(settingsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  } catch (error) {
    // 설정 파일 업데이트 실패는 무시 (선택사항)
    console.debug('Could not update settings file:', error);
  }
}

function getModeInfo(mode: string): any {
  const modeInfos: Record<string, any> = {
    'pro-writer': {
      description: 'Professional writing mode with literary expertise, research tools, and publishing workflows.',
      tools: ['Research tools', 'Citation management', 'Style guides', 'Export tools']
    },
    'ghostwriter': {
      description: 'Collaborative writing mode for voice analysis, interviews, and co-creation.',
      tools: ['Voice analysis', 'Interview tools', 'Safety filters', 'Collaboration tools']
    },
    'novel-auto': {
      description: 'Automated novel generation with world-building and continuity management.',
      tools: ['World parser', 'Continuity engine', 'Character bible', 'Plot generator']
    }
  };
  
  return modeInfos[mode] || modeInfos['pro-writer'];
}
