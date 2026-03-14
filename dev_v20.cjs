#!/usr/bin/env node

// Set environment variables
process.env.DATABASE_URL = 'postgres://postgres@localhost:5432/medusa-marketplace';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.NODE_ENV = 'development';
process.env.PORT = '9000';

// Medusa v2 Admin config
process.env.MEDUSA_ADMIN_PATH = './src/admin';
process.env.MEDUSA_ADMIN_URL = 'http://localhost:9000/admin';
process.env.MEDUSA_ADMIN_BUILD_PATH = './.medusa/admin';

// Debug
process.env.NODE_OPTIONS = '--trace-uncaught';

// Import required modules
const { spawn } = require('child_process');
const path = require('path');

// Build the command
const medusaCliPath = path.resolve(process.cwd(), './node_modules/@medusajs/medusa-cli/cli.js');
const nodePath = process.execPath;
const args = [medusaCliPath, 'develop', '--port', '9000', '--no-admin'];

console.log(`Starting Medusa with Node: ${nodePath}`);
console.log(`CLI Path: ${medusaCliPath}`);
console.log(`Env: NODE_ENV=${process.env.NODE_ENV}, PORT=${process.env.PORT}`);

// Spawn the Medusa CLI
const child = spawn(nodePath, args, {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: process.env
});

// Handle process exit
child.on('close', (code) => {
  console.log(`Medusa process exited with code ${code}`);
});
