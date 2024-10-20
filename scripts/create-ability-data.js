import exec from 'child_process';
import fs from 'fs';

let abilityInfo;
let abilityTokens;
let abilityRemap;

async function createData() {
    const abilities = await fetch("https://raw.githubusercontent.com/Leanny/splat3/refs/heads/main/data/parameter/910/misc/spl__GearSkillTraitsParam.spl__GearSkillTraitsParam.json")
    abilityInfo = await abilities.json();

    abilityTokens = JSON.parse(fs.readFileSync('./scripts/input/ability-tokens.json', 'utf8'));
    abilityRemap = JSON.parse(fs.readFileSync('./scripts/input/ability-remap.json', 'utf8'));

    createAbilityData();
    createTokenData();
}

function createAbilityData() {
    const path = './src/lib/data/abilities/abilities.ts';
    let abilities = {};

    for (const [key, value] of Object.entries(abilityInfo.Traits)) {
        const name = key;
        const id = (Object.keys(abilityInfo.Traits).indexOf(name) + 1).toString();
        const main = value.KindLimit !== "None";
        const mainType = value.KindLimit;
        const image = `/src/lib/images/abilities/${name}.png`;

        abilities[name] = { id, name, main, mainType, image };
    }

    const emptyAbility = abilities["None"];
    delete abilities["None"];

    console.log(`Creating file for abilities`);

    fs.writeFileSync(path, `import type { Ability } from './types'; \n\n export const emptyAbility: Ability = ${JSON.stringify(emptyAbility, null, 4)}; \n\n export const abilities: { [key: string]: Ability } = ${JSON.stringify(abilities, null, 4)};`);
    exec.execSync(`npx prettier --write ${path}`);
}

function createTokenData() {
    for (const [key, value] of Object.entries(abilityTokens)) {
        const weapon = key.split("_")[2];
        const path = `./src/lib/data/abilities/tokens/${weapon}.ts`;

        let abilities = {};

        for (const [ability, probability] of Object.entries(value)) {
            const split = ability.split('_');
            const num = parseInt(split[split.length - 1]) ? parseInt(split.pop() || '0') : 0;
            const name = split.join('_');
            const newName = abilityRemap[name];

            if (!newName) continue;

            if (!abilities[newName]) abilities[newName] = {};
            abilities[newName][num] = probability;
        }

        const remainingWeapons = Object.keys(abilityTokens).length - Object.keys(abilityTokens).indexOf(key) - 1;
        console.log(`Creating file for weapon ${weapon} \t (${remainingWeapons} remaining)`);

        fs.writeFileSync(path, `import type { Tokens } from './types'; \n\n export const tokens: Tokens = ${JSON.stringify(abilities, null, 4)};`);
        exec.execSync(`npx prettier --write ${path}`);
    }
}

createData();