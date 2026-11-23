Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$outputWav = Join-Path $PSScriptRoot "aeroshield_narration.wav"
$synth.SetOutputToWaveFile($outputWav)
$synth.Speak("Meet AeroShield AI, your family's smart urban smog defense assistant. From 1 to 3 PM solar ventilation windows to low-cost Desi Jugaad hacks, breathe cleaner and live safer.")
$synth.Dispose()
Write-Output "Generated voice to: $outputWav"
