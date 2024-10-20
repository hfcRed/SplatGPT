import fs from 'fs';

createData();

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

async function createMainData() {
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

    fs.writeFileSync('./scripts/output/weapons.json', JSON.stringify(weapons, null, 4));
}