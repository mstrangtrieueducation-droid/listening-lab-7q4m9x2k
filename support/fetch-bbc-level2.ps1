$ErrorActionPreference = 'Stop'

$rssPath = Join-Path $env:TEMP 'bbc-6min-rss.xml'
[xml]$feed = Get-Content -LiteralPath $rssPath -Raw
$outputDir = Join-Path $PSScriptRoot '..\source-media-work\bbc40'
New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

$manifest = @()
foreach ($item in @($feed.rss.channel.item)) {
  if ($manifest.Count -ge 40) { break }
  $description = $item.description.InnerText
  $match = [regex]::Match($description, 'https://www\.bbc\.co\.uk/learningenglish/english/features/6-minute-english_\d{4}/ep-\d+')
  if (-not $match.Success) { continue }

  $pageUrl = $match.Value
  $mirrorUrl = $pageUrl -replace 'https://www\.bbc\.co\.uk', 'https://feeds.bbci.co.uk'
  $candidate = $manifest.Count + 1
  $file = Join-Path $outputDir ('{0:D2}.html' -f $candidate)

  try {
    if (-not (Test-Path $file) -or (Get-Item $file).Length -lt 20000) {
      Invoke-WebRequest -Uri $mirrorUrl -OutFile $file -UseBasicParsing -ErrorAction Stop
    }
    $raw = Get-Content -LiteralPath $file -Raw
    if ($raw -notmatch 'TRANSCRIPT' -or $raw -notmatch 'Download Audio') {
      throw 'missing transcript or audio'
    }
    $manifest += [pscustomobject]@{
      index = $manifest.Count + 1
      title = [string]$item.title
      date = [string]$item.pubDate
      duration = [int]$item.duration
      audio = (([string]$item.enclosure.url) -replace '^http:', 'https:')
      page = $pageUrl
      html = $file
    }
    Write-Output ('ready {0}/40 {1}' -f $manifest.Count, $item.title)
  } catch {
    Remove-Item -LiteralPath $file -Force -ErrorAction SilentlyContinue
    Write-Output ('skip {0}' -f $item.title)
  }
}

$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $outputDir 'manifest.json') -Encoding utf8
Write-Output ('manifest={0}' -f $manifest.Count)
