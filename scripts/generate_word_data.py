import json
from pathlib import Path

def generate_words(data_dir: Path):
    ayahs_path = data_dir / "ayahs.json"
    if not ayahs_path.exists():
        print(f"Error: {ayahs_path} not found.")
        return

    with ayahs_path.open("r", encoding="utf-8") as f:
        ayahs = json.load(f)

    words = []
    word_id = 1
    
    for ayah in ayahs:
        # Tokenize by space. In a more advanced version, we'd handle punctuation better.
        # But for Quranic text, usually simple splitting works for MVP.
        raw_words = ayah["text"].split()
        for i, word_text in enumerate(raw_words, start=1):
            words.append({
                "id": word_id,
                "ayah_id": ayah["id"],
                "text": word_text,
                "position": i,
                "surah_id": ayah["surah_id"],
                "number_in_surah": ayah["number_in_surah"],
                "root": None, # Placeholder for future enhancement
                "morphology": None # Placeholder for future enhancement
            })
            word_id += 1

    output_path = data_dir / "words.json"
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully generated {len(words)} words in {output_path}")

if __name__ == "__main__":
    generate_words(Path("lib/data"))
