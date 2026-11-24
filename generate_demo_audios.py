import asyncio
import edge_tts
import os

scenes = [
    {
        "filename": "scene1_intro_hook.mp3",
        "title": "Scene 1: The Hook & Crisis",
        "text": (
            "Hello judges! Over 300 million citizens across the Indo-Gangetic Plains "
            "breathe toxic winter smog equivalent to smoking 25 to 30 cigarettes a day. "
            "Branded purifiers cost 25,000 rupees, while ordinary weather apps simply show scary red numbers without solutions. "
            "This is AeroShield AI, or VayuMitra OS—our GenAI clean-air defense companion built for PromptWars Challenge 6 "
            "that turns winter smog anxiety into daily clean-air action."
        )
    },
    {
        "filename": "scene2_telemetry_solar_window.mp3",
        "title": "Scene 2: Atmospheric Telemetry & Solar Window",
        "text": (
            "AeroShield AI automatically detects device location and time, streaming live satellite telemetry "
            "from European Copernicus satellites via Open-Meteo. "
            "Our rotary dial converts PM2.5 directly into Berkeley Earth cigarette equivalence. "
            "Crucially, our diurnal inversion detector calculates the 1 to 3 PM Solar Convective Lift Window—"
            "the only time during winter when thermal solar expansion breaks the cold pool, allowing 15 minutes of safe household cross-ventilation."
        )
    },
    {
        "filename": "scene3_desi_jugaad_multi_ai.mp3",
        "title": "Scene 3: ₹1,200 Desi Jugaad Lab & Multi-AI Launcher",
        "text": (
            "To democratize clean air, our interactive CADR calculator models a 1,200 rupee DIY Box-Fan "
            "with MERV 13 and HEPA filtration, delivering over 300 CFM Clean Air Delivery Rate at 90 percent lower cost than commercial purifiers. "
            "Our One-Click Multi-AI engine auto-synthesizes prompts with live weather and family profiles, "
            "allowing 1-click deep-dive consults directly in ChatGPT, Claude, and Gemini."
        )
    },
    {
        "filename": "scene4_judges_devtools_conclusion.mp3",
        "title": "Scene 4: Judges DevTools & Conclusion",
        "text": (
            "For full transparency, judges can launch Judges DevTools to inspect our Gemini 2.5 Flash system instructions, "
            "token counts, and execution latency in real time. "
            "Built with a Zero-Crash fallback engine and localized in 7 Indian regional languages, "
            "AeroShield AI is completely responsive and production-ready. "
            "Thank you, Hack2skill and Google for Developers!"
        )
    }
]

output_dir = r"d:\PROJECTS\PromptWars\public\demo_audios"
artifact_dir = r"C:\Users\ajmal\.gemini\antigravity\brain\8a497c8f-ee82-4341-a038-c6273096c7e4"

async def generate():
    voice = "en-IN-PrabhatNeural"
    rate = "-3%"
    volume = "+0%"
    
    full_text_parts = []
    
    for scene in scenes:
        path = os.path.join(output_dir, scene["filename"])
        artifact_path = os.path.join(artifact_dir, scene["filename"])
        print(f"Generating {scene['filename']}...")
        communicate = edge_tts.Communicate(scene["text"], voice, rate=rate, volume=volume)
        await communicate.save(path)
        
        # Also copy to artifact dir
        with open(path, "rb") as src, open(artifact_path, "wb") as dst:
            dst.write(src.read())
            
        full_text_parts.append(scene["text"])
        print(f"Saved: {path} and {artifact_path}")

    # Generate full combined narration with natural pause markers
    full_text = " ... ... ".join(full_text_parts)
    full_path = os.path.join(output_dir, "full_demo_narration.mp3")
    full_artifact = os.path.join(artifact_dir, "full_demo_narration.mp3")
    print("Generating full_demo_narration.mp3...")
    communicate_full = edge_tts.Communicate(full_text, voice, rate=rate, volume=volume)
    await communicate_full.save(full_path)
    with open(full_path, "rb") as src, open(full_artifact, "wb") as dst:
        dst.write(src.read())
    print("All audios generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
