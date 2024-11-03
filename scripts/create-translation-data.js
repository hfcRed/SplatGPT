import exec from 'child_process';
import fs from 'fs';

const languages = { en: "USen", jp: "JPja" }

let weaponInfoMain;
let translationData;

async function createData() {
    const mains = await fetch("https://raw.githubusercontent.com/Leanny/splat3/refs/heads/main/data/mush/910/WeaponInfoMain.json")
    weaponInfoMain = await mains.json();

    for (const [language, code] of Object.entries(languages)) {
        const response = await fetch(`https://raw.githubusercontent.com/Leanny/splat3/refs/heads/main/data/language/${code}_full_unicode.json`);
        const translations = await response.json();

        translationData = { ...translationData, [language]: translations };
    }

    createTranslationData();
}

function createTranslationData() {
    let weapons = [];

    for (const weapon of weaponInfoMain) {
        if (weapon.Type !== "Versus") continue;
        weapons.push(weapon.__RowId);
    }

    for (const [language, translations] of Object.entries(translationData)) {
        const path = `./messages/${language}.json`;
        const weaponInfo = translations["CommonMsg/Weapon/WeaponName_Main"];

        let translationOutput = JSON.parse(fs.readFileSync(path, 'utf8'));
        let translatedWeapons = [];

        for (const weapon of weapons) {
            if (!weaponInfo[weapon]) continue;
            translatedWeapons.push([weapon, weaponInfo[weapon]]);
        }

        translationOutput["weapons"] = JSON.stringify(translatedWeapons, null, 0);

        console.log(`Creating file for ${language} translations`);

        fs.writeFileSync(path, JSON.stringify(translationOutput, null, 4));
        exec.execSync(`npx prettier --write ${path}`);
    }
}

createData();