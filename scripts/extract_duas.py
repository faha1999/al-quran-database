import json
from pathlib import Path

DATA_DIR = Path("lib/data")
AYAH_FILE = DATA_DIR / "ayahs.json"
OUTPUT_FILE = DATA_DIR / "duas.json"

def extract_duas():
    print("Extracting Duas from ayahs.json...")
    with open(AYAH_FILE, "r", encoding="utf-8") as f:
        ayahs = json.load(f)
        
    duas = []
    # Key supplication starters in Arabic
    starters = ["رَبَّنَا", "رَبِّ", "قُلِ ٱللَّهُمَّ", "وَقُل رَّبِّ"]
    
    for ayah in ayahs:
        text = ayah["text"].strip()
        # Clean up optional initial symbols like basmalah if present in search
        if any(text.startswith(s) or (" " + s) in text for s in starters):
            duas.append({
                "ayah_id": ayah["id"],
                "surah_id": ayah["surah_id"],
                "ayah_number": ayah["number_in_surah"],
                "text": text
            })
            
    print(f"Extracted {len(duas)} Duas.")
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(duas, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    extract_duas()
