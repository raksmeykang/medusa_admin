import http from 'http';
import { spawn } from 'child_process';
import { loadEnv } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

const port = process.env.PORT || 9000;

console.log(`Starting Medusa on port ${port}...`);
// Always try to start Medusa so we can see what errors if it's missing DATABASE_URL
const medusa = spawn('npx', ['medusa', 'develop', '--port', port.toString()], { stdio: 'inherit', shell: true });
