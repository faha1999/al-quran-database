import json
import shutil
from pathlib import Path
from datetime import datetime

DATA_DIR = Path("lib/data")
VERSION_FILE = DATA_DIR / "version.json"

def get_current_version():
    if not VERSION_FILE.exists():
        return 0
    with VERSION_FILE.open("r") as f:
        return json.load(f).get("version", 0)

def set_current_version(version):
    with VERSION_FILE.open("w") as f:
        json.dump({"version": version, "updated_at": datetime.now().isoformat()}, f, indent=2)

def backup_data(version):
    backup_dir = Path("backups") / f"v{version}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    backup_dir.mkdir(parents=True, exist_ok=True)
    for f in DATA_DIR.glob("*.json"):
        shutil.copy(f, backup_dir)
    print(f"Backup created at {backup_dir}")

def migrate_to_v1():
    """
    Example migration: Ensure all ayahs have a 'sajda' field.
    """
    print("Migrating to v1: Adding 'sajda' field to ayahs...")
    ayahs_file = DATA_DIR / "ayahs.json"
    if ayahs_file.exists():
        with ayahs_file.open("r") as f:
            ayahs = json.load(f)
        
        modified = False
        for ayah in ayahs:
            if "sajda" not in ayah:
                ayah["sajda"] = False
                modified = True
        
        if modified:
            with ayahs_file.open("w") as f:
                json.dump(ayahs, f, ensure_ascii=False, indent=2)
            print("Updated ayahs.json")

def migrate_to_v2():
    """
    Example migration: Ensure all surahs have 'name_en_translation'.
    """
    print("Migrating to v2: Validating surah metadata...")
    surahs_file = DATA_DIR / "surahs.json"
    if surahs_file.exists():
        with surahs_file.open("r") as f:
            surahs = json.load(f)
        
        # In a real scenario, we might fetch missing data from an API
        # Here we just ensure the field exists
        for surah in surahs:
            if "name_en_translation" not in surah:
                surah["name_en_translation"] = surah["name_en"]
        
        with surahs_file.open("w") as f:
            json.dump(surahs, f, ensure_ascii=False, indent=2)
        print("Updated surahs.json")

MIGRATIONS = {
    1: migrate_to_v1,
    2: migrate_to_v2,
}

def run_migrations():
    current_v = get_current_version()
    latest_v = max(MIGRATIONS.keys()) if MIGRATIONS else current_v
    
    if current_v >= latest_v:
        print(f"Database is up to date (version {current_v})")
        return

    print(f"Current version: {current_v}. Target version: {latest_v}")
    backup_data(current_v)
    
    for v in range(current_v + 1, latest_v + 1):
        if v in MIGRATIONS:
            MIGRATIONS[v]()
            set_current_version(v)
            print(f"Successfully migrated to v{v}")

if __name__ == "__main__":
    run_migrations()
