$folder = "C:\Drukowanie"
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $folder
$watcher.Filter = "*.txt"
$watcher.EnableRaisingEvents = $true
$watcher.IncludeSubdirectories = $false
$watcher.NotifyFilter = [System.IO.NotifyFilters]::FileName, [System.IO.NotifyFilters]::LastWrite

$action = {
    Start-Sleep -Seconds 1  # Krótkie opóźnienie, aby upewnić się, że plik jest gotowy
    $filePath = $Event.SourceEventArgs.FullPath
    if (Test-Path $filePath) {
        Write-Host "Drukowanie pliku: $filePath"
        Start-Process -FilePath $filePath -Verb Print
    }
}

Register-ObjectEvent $watcher "Created" -Action $action
Register-ObjectEvent $watcher "Changed" -Action $action

Write-Host "Monitorowanie folderu $folder... Nacisnij Ctrl+C, aby zakonczyc."
while ($true) { Start-Sleep 10 }
