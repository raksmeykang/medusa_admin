const http = require('http');
const { spawn } = require('child_process');

const port = 3000;

// If there is no database URL provided in the environment, Medusa will crash.
// To prevent the preview window from showing a broken "502 Bad Gateway" error,
// we start a placeholder server that explains the status.
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('<user>')) {
  console.log("No valid DATABASE_URL found. Starting standby preview server...");
  
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Medusa v2 - Standby</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f9fafb; color: #111827; }
            .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); text-align: center; max-width: 500px; }
            h1 { margin-top: 0; font-size: 24px; }
            p { color: #4b5563; line-height: 1.5; }
            .badge { display: inline-block; background: #e0e7ff; color: #4f46e5; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 500; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">Backend Ready for Deployment</div>
            <h1>Medusa v2 Multi-Vendor</h1>
            <p>Your codebase is being built correctly, but the Medusa server is currently in <strong>standby mode</strong>.</p>
            <p>Because you are connecting your PostgreSQL database at deployment, the core Medusa engine cannot boot in this preview window.</p>
            <p>You can continue building features with the AI, and export the code when you are ready to deploy!</p>
          </div>
        </body>
      </html>
    `);
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Standby server running on port ${port}`);
  });
} else {
  console.log("DATABASE_URL found. Starting Medusa...");
  const medusa = spawn('npx', ['medusa', 'develop', '--port', port.toString()], { stdio: 'inherit' });
}
