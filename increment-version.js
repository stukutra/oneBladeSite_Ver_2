const fs = require('fs');
const path = require('path');

const versionFilePath = path.join(__dirname, 'src/assets/data/version.json'); // Aggiorna il percorso del file JSON
const versionFile = require(versionFilePath);

const versionParts = versionFile.version.split('.').map(Number);
versionParts[2] += 1; // Incrementa la patch version
versionFile.version = versionParts.join('.');

fs.writeFileSync(versionFilePath, JSON.stringify(versionFile, null, 2));
