$NodeBin = "$PWD\node_portable\node-v20.18.0-win-x64\node.exe"
$MedusaCli = "$PWD\node_modules\@medusajs\medusa-cli\cli.js"

# Environment Variables
$env:DATABASE_URL = 'postgres://postgres@localhost:5432/medusa-marketplace'
$env:REDIS_URL = 'redis://localhost:6379'
$env:PORT = '9000'
$env:NODE_ENV = 'development'
$env:MEDUSA_CLI = 'true'
$env:GHOST_MODE = 'false'

# Append portable node to PATH for this process
$env:PATH = "$PWD\node_portable\node-v20.18.0-win-x64;" + $env:PATH

Write-Host "Starting Medusa with portable Node v20 and explicit env..."
& $NodeBin $MedusaCli develop --port 9000 --no-admin
