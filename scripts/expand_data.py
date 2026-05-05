import json
import os
import urllib.request
import urllib.error
from pathlib import Path
import time

DATA_DIR = Path("lib/data")
EDITIONS_FILE = DATA_DIR / "editions.json"
MANIFEST_FILE = DATA_DIR / "edition-manifest.json"
AYAH_EDITIONS_DIR = DATA_DIR / "ayah-editions"

API_BASE_URL = "https://api.alquran.cloud/v1"

def fetch_edition_content(identifier):
    print(f"Fetching content for {identifier}...")
    url = f"{API_BASE_URL}/quran/{identifier}"
    try:
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode())
    except urllib.error.URLError as e:
        print(f"Error fetching {identifier}: {e}")
        raise
    
    records = []
    for surah in data["data"]["surahs"]:
        for ayah in surah["ayahs"]:
            records.append({
                "ayah_id": ayah["number"],
                "data": ayah["text"],
                "is_audio": data["data"]["edition"]["format"] == "audio"
            })
    return records

def add_edition_to_system(edition_info, records):
    identifier = edition_info["identifier"]
    print(f"Adding {identifier} to system...")
    
    # 1. Save sharded files (limit 500 records per shard)
    files = []
    if len(records) <= 500:
        file_name = f"ayah-editions/{identifier}.json"
        with open(DATA_DIR / file_name, "w", encoding="utf-8") as f:
            json.dump(records, f, ensure_ascii=False, separators=(",", ":"))
        files.append(file_name)
    else:
        for shard_index, start in enumerate(range(0, len(records), 500), start=1):
            shard_records = records[start : start + 500]
            file_name = f"ayah-editions/{identifier}.part-{shard_index}.json"
            with open(DATA_DIR / file_name, "w", encoding="utf-8") as f:
                json.dump(shard_records, f, ensure_ascii=False, separators=(",", ":"))
            files.append(file_name)
            
    # 2. Update editions.json
    with open(EDITIONS_FILE, "r", encoding="utf-8") as f:
        editions = json.load(f)
        
    if not any(e["identifier"] == identifier for e in editions):
        editions.append({
            "id": len(editions) + 1,
            "identifier": identifier,
            "language": edition_info["language"],
            "name": edition_info["name"],
            "englishName": edition_info["englishName"],
            "format": edition_info["format"],
            "type": edition_info["type"]
        })
        with open(EDITIONS_FILE, "w", encoding="utf-8") as f:
            json.dump(editions, f, ensure_ascii=False, indent=2)
            
    # 3. Update edition-manifest.json
    with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
        manifest = json.load(f)
        
    manifest["editions"][identifier] = {
        "edition_id": next(e["id"] for e in editions if e["identifier"] == identifier),
        "language": edition_info["language"],
        "type": edition_info["type"],
        "format": edition_info["format"],
        "row_count": len(records),
        "files": files
    }
    with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

def expand_translations():
    to_add = [
        {"identifier": "ur.maududi", "language": "ur", "name": "ابوالاعلی مودودی", "englishName": "Abul A'ala Maududi", "format": "text", "type": "translation"},
        {"identifier": "fr.hamidullah", "language": "fr", "name": "Hamidullah", "englishName": "Muhammad Hamidullah", "format": "text", "type": "translation"},
        {"identifier": "tr.diyanet", "language": "tr", "name": "Diyanet İşleri", "englishName": "Diyanet Isleri", "format": "text", "type": "translation"},
        {"identifier": "id.indonesian", "language": "id", "name": "Bahasa Indonesia", "englishName": "Unknown", "format": "text", "type": "translation"},
        {"identifier": "ru.kuliev", "language": "ru", "name": "Кулиев", "englishName": "Elmir Kuliev", "format": "text", "type": "translation"},
        {"identifier": "es.asad", "language": "es", "name": "Asad", "englishName": "Muhammad Asad - Abdurrasak Pérez", "format": "text", "type": "translation"},
    ]
    
    for edition in to_add:
        try:
            records = fetch_edition_content(edition["identifier"])
            add_edition_to_system(edition, records)
            time.sleep(1) # Be nice to API
        except Exception as e:
            print(f"Error adding {edition['identifier']}: {e}")

def expand_tafsir():
    to_add = [
        {"identifier": "ar.jalalayn", "language": "ar", "name": "تفسير الجلالين", "englishName": "Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti", "format": "text", "type": "tafsir"},
        {"identifier": "ar.qurtubi", "language": "ar", "name": "تفسير القرطبي", "englishName": "Tafseer Al Qurtubi", "format": "text", "type": "tafsir"},
    ]
    for edition in to_add:
        try:
            records = fetch_edition_content(edition["identifier"])
            add_edition_to_system(edition, records)
            time.sleep(1)
        except Exception as e:
            print(f"Error adding {edition['identifier']}: {e}")

def expand_transliteration():
    to_add = [
        {"identifier": "en.transliteration", "language": "en", "name": "Transliteration", "englishName": "English Transliteration", "format": "text", "type": "transliteration"},
    ]
    for edition in to_add:
        try:
            records = fetch_edition_content(edition["identifier"])
            add_edition_to_system(edition, records)
            time.sleep(1)
        except Exception as e:
            print(f"Error adding {edition['identifier']}: {e}")

def main():
    print("Starting Data Expansion...")
    expand_translations()
    expand_tafsir()
    expand_transliteration()
    print("Data Expansion completed.")

if __name__ == "__main__":
    main()
