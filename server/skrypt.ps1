$folder = "C:\Drukowanie"
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $folder
$watcher.Filter = "*.txt"
$watcher.EnableRaisingEvents = $true
$watcher.IncludeSubdirectories = $false

Register-ObjectEvent $watcher "Created" -Action {
    Start-Process -FilePath $Event.SourceEventArgs.FullPath -Verb Print
}

Write-Host "Monitorowanie folderu $folder... Nacisnij Ctrl+C, aby zakonczyc."
while ($true) { Start-Sleep 10 }
