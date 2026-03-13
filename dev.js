const http = require('http');
const { spawn } = require('child_process');
require('dotenv').config();

const port = 3000;

console.log("Starting Medusa...");
const medusa = spawn('npx', ['medusa', 'develop', '--port', port.toString()], { stdio: 'inherit' });
