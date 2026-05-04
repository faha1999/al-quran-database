import json
import shutil
from pathlib import Path

DATA_DIR = Path("lib/data")
SAMPLE_DIR = Path("lib/data/sample")

def create_sample_data(num_surahs=3):
    print(f"Creating sample data with first {num_surahs} surahs...")
    SAMPLE_DIR.mkdir(parents=True, exist_ok=True)
    
    # Load surahs
    with (DATA_DIR / "surahs.json").open("r") as f:
        surahs = json.load(f)
    sample_surahs = surahs[:num_surahs]
    sample_surah_ids = [s["id"] for s in sample_surahs]
    
    # Save sample surahs
    with (SAMPLE_DIR / "surahs.json").open("w") as f:
        json.dump(sample_surahs, f, indent=2, ensure_ascii=False)
    
    # Load ayahs
    with (DATA_DIR / "ayahs.json").open("r") as f:
        ayahs = json.load(f)
    sample_ayahs = [a for a in ayahs if a["surah_id"] in sample_surah_ids]
    sample_ayah_ids = [a["id"] for a in sample_ayahs]
    
    # Save sample ayahs
    with (SAMPLE_DIR / "ayahs.json").open("w") as f:
        json.dump(sample_ayahs, f, indent=2, ensure_ascii=False)
        
    # Load words
    with (DATA_DIR / "words.json").open("r") as f:
        words = json.load(f)
    sample_words = [w for w in words if w["ayah_id"] in sample_ayah_ids]
    
    # Save sample words
    with (SAMPLE_DIR / "words.json").open("w") as f:
        json.dump(sample_words, f, indent=2, ensure_ascii=False)

    # Copy other metadata files (small ones)
    for meta_file in ["editions.json", "reciters.json", "edition-manifest.json"]:
        if (DATA_DIR / meta_file).exists():
            shutil.copy(DATA_DIR / meta_file, SAMPLE_DIR / meta_file)

    print(f"Sample data created at {SAMPLE_DIR}")
    print(f"Surahs: {len(sample_surahs)}")
    print(f"Ayahs: {len(sample_ayahs)}")
    print(f"Words: {len(sample_words)}")

if __name__ == "__main__":
    create_sample_data()
