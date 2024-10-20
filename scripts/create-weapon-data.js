import exec from 'child_process';
import fs from 'fs';

let weaponInfoMain;
let weaponInfoSub;
let weaponInfoSpecial;

async function createData() {
    const mains = await fetch("https://raw.githubusercontent.com/Leanny/splat3/refs/heads/main/data/mush/910/WeaponInfoMain.json")
    weaponInfoMain = await mains.json();

    const subs = await fetch("https://raw.githubusercontent.com/Leanny/splat3/refs/heads/main/data/mush/910/WeaponInfoSub.json")
    weaponInfoSub = await subs.json();

    const specials = await fetch("https://raw.githubusercontent.com/Leanny/splat3/refs/heads/main/data/mush/910/WeaponInfoSpecial.json")
    weaponInfoSpecial = await specials.json();

    createMainData();
}

function createMainData() {
    const path = './src/lib/data/weapons/weapons.ts';
    let weapons = {};

    for (const weapon of weaponInfoMain) {
        if (weapon.Type !== "Versus") continue;

        const regex = /^[^/]+\/[^/]+\/([^/.]+)\./;
        const subName = (weapon.SubWeapon).match(regex)[1];
        const specialName = (weapon.SpecialWeapon).match(regex)[1];

        const id = weapon.Id;
        const name = weapon.__RowId;
        const image = `/src/lib/images/weapons/Path_Wst_${name}.png`
        const sub = weaponInfoSub.find(sub => sub.__RowId === subName).Id;
        const subImage = `/src/lib/images/subs/${subName}.png`
        const special = weaponInfoSpecial.find(special => special.__RowId === specialName).Id;
        const specialImage = `/src/lib/images/specials/${specialName}.png`

        weapons[id] = { id, name, image, sub: { id: sub, name: subName, image: subImage }, special: { id: special, name: specialName, image: specialImage } };
    }

    console.log(`Creating file for weapons`);

    fs.writeFileSync(path, `import type { Weapon } from './types'; \n\n export const weapons: { [key: string]: Weapon } = ${JSON.stringify(weapons, null, 4)};`);
    exec.execSync(`npx prettier --write ${path}`);
}

createData();