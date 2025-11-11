$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(-_=+)"
$secretKey = -join ((1..50) | ForEach-Object { $chars[(Get-Random -Maximum $chars.Length)] })

$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace 'your-secret-key-here', $secretKey
Set-Content ".env" -Value $envContent -NoNewline

Write-Host "SECRET_KEY gerada e adicionada ao arquivo .env"
Write-Host "Chave: $secretKey"
