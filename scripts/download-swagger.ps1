$files = @(
    "https://unpkg.com/swagger-ui-dist/swagger-ui.css",
    "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js", 
    "https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"
)

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "./public/swagger"

foreach ($file in $files) {
    $fileName = Split-Path $file -Leaf
    Invoke-WebRequest -Uri $file -OutFile "./public/swagger/$fileName"
}