import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to run a command in a specific directory
const runCommand = (command, args, cwd) => {
  const proc = spawn(command, args, {
    cwd,
    shell: process.platform === 'win32', // Use shell on Windows
    stdio: 'inherit'
  });

  return proc;
};

// Run client (Vite) in the root directory
console.log('📝 Starting client...');
const client = runCommand(
  'npm',
  ['run', 'dev'],
  process.cwd()
);

// Run server in the server directory
console.log('🚀 Starting server...');
const server = runCommand(
  'node',
  ['index.js'],
  path.join(process.cwd(), 'server')
);

// Handle process termination
const cleanup = () => {
  if (client && !client.killed) {
    client.kill();
  }
  if (server && !server.killed) {
    server.kill();
  }
  process.exit(0);
};

// Listen for termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup); 