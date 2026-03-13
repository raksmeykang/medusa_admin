const http = require('http');
const { spawn } = require('child_process');

const port = process.env.PORT || 9000;

console.log(`Starting Medusa on port ${port}...`);
// Always try to start Medusa so we can see what errors if it's missing DATABASE_URL
const medusa = spawn('npx', ['medusa', 'develop', '--port', port.toString()], { stdio: 'inherit', shell: true });



