$NodeVersion = "20.18.0"
$InstallPath = "$PWD\node_portable"
$NodeUrl = "https://nodejs.org/dist/v$NodeVersion/node-v$NodeVersion-win-x64.zip"
$ZipPath = "$InstallPath\node.zip"

Write-Host "Creating directory: $InstallPath"
New-Item -ItemType Directory -Path $InstallPath -Force | Out-Null

Write-Host "Downloading Node.js v$NodeVersion from $NodeUrl..."
Invoke-WebRequest -Uri $NodeUrl -OutFile $ZipPath

Write-Host "Extracting Node.js..."
Expand-Archive -Path $ZipPath -DestinationPath $InstallPath -Force

Write-Host "Cleaning up zip file..."
Remove-Item $ZipPath

$ExtractedPath = Get-ChildItem -Path $InstallPath | Where-Object { $_.PSIsContainer -and $_.Name -like "node-v$NodeVersion*" }
if ($ExtractedPath) {
    Write-Host "Successfully extracted to $($ExtractedPath.FullName)"
} else {
    Write-Error "Extraction failed or directory name mismatch."
    exit 1
}

Write-Host "Portable Node.js v$NodeVersion setup complete."
