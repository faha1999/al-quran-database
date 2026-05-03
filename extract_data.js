const fs = require('fs');
const path = require('path');
const readline = require('readline');

const sqlFile = path.join(__dirname, 'quran.sql');
const outputDir = path.join(__dirname, 'lib/data');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function splitValues(valueStr) {
    const values = [];
    let current = '';
    let inString = false;
    for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i-1] !== '\\') inString = !inString;
        if (char === ',' && !inString) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values.map(v => v.replace(/^'|'$/g, '').replace(/\\'/g, "'"));
}

async function extract() {
    const fileStream = fs.createReadStream(sqlFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const surahs = [];
    const ayahs = [];
    let currentTable = null;

    console.log('Parsing SQL file...');

    for await (const line of rl) {
        if (line.includes('INSERT INTO `surahs`')) {
            currentTable = 'surahs';
            continue;
        } else if (line.includes('INSERT INTO `ayahs`')) {
            currentTable = 'ayahs';
            continue;
        } else if (line.trim().startsWith('(')) {
            const rowStr = line.trim().replace(/,$/, '').replace(/;$/, '').replace(/^\(|\)$/g, '');
            const vals = splitValues(rowStr);
            
            if (currentTable === 'surahs') {
                surahs.push({
                    id: parseInt(vals[0]),
                    number: parseInt(vals[1]),
                    name_ar: vals[2],
                    name_en: vals[3],
                    name_en_translation: vals[4],
                    type: vals[5]
                });
            } else if (currentTable === 'ayahs') {
                ayahs.push({
                    id: parseInt(vals[0]),
                    number: parseInt(vals[1]),
                    text: vals[2],
                    number_in_surah: parseInt(vals[3]),
                    page: parseInt(vals[4]),
                    surah_id: parseInt(vals[5]),
                    juz_id: parseInt(vals[7]),
                    sajda: vals[8] === '1'
                });
            }
        } else if (line.includes('--') || line.trim() === '') {
            // Comment or empty line reset current table if needed
            if (line.includes('Dumping data for table')) {
                 // stay on current table if it matches
            } else {
                // currentTable = null; // Dangerous if multi-line is interrupted by comments
            }
        } else if (line.includes('UNLOCK TABLES') || line.includes('CREATE TABLE')) {
            currentTable = null;
        }
    }

    console.log(`Extracted ${surahs.length} surahs and ${ayahs.length} ayahs.`);

    fs.writeFileSync(path.join(outputDir, 'surahs.json'), JSON.stringify(surahs, null, 2));
    fs.writeFileSync(path.join(outputDir, 'ayahs.json'), JSON.stringify(ayahs, null, 2));

    console.log('Done.');
}

extract().catch(console.error);

