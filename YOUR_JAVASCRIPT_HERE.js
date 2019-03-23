// Write your JS here
const hero = {
    name: "Bean",
    heroic: true,
    inventory: [],
    health: 10,
    weapon: {
        type: "sword",
        damage: 2,
    }
}

const enemy = {
    name: "Dragon",
    inventory: [],
    health: 20,
    weapon: {
        type: "breath",
        damage: 3,
    },
}

const dagger = {
    type: "dagger",
    damage: 2,
}

function rest(hObj) {
    if(hObj.health >= 10) {
        alert("Your hero is already fully rested!")
    } else {
        hObj.health = 10;
    }
    return hObj;
}

function pickUpItem(hObj, weapon) {
    hObj.inventory.push(weapon);
}

function equipWeapon(hObj) {
    if(hObj.inventory[0]) {
        hObj.weapon = hObj.inventory[0];
    }
}

function displayHeroStats(hObj) {
    const weaponType = hObj.weapon.type;
    const weaponDamage = hObj.weapon.damage;
    const name = hObj.name;
    const health = hObj.health;

    const stats = document.getElementById('heroStats');

    const damage = document.createElement('li')
    damage.innerText = "Damage: " + weaponDamage;
    stats.appendChild(damage);

    const weapon = document.createElement('li')
    weapon.innerText = "Weapon: " + weaponType;
    stats.appendChild(weapon);

    const heroName = document.createElement('li')
    heroName.innerText = "Name: " + name;
    stats.appendChild(heroName);

    const heroHealth = document.createElement('li')
    heroHealth.innerText = "Health: " + health;
    stats.appendChild(heroHealth);

}

function displayEnemyStats(eObj) {
    const weaponType = eObj.weapon.type;
    const weaponDamage = eObj.weapon.damage;
    const name = eObj.name;
    const health = eObj.health;

    const stats = document.getElementById('enemyStats');

    const damage = document.createElement('li')
    damage.innerText = "Damage: " + weaponDamage;
    stats.appendChild(damage);

    const weapon = document.createElement('li')
    weapon.innerText = "Weapon: " + weaponType;
    stats.appendChild(weapon);

    const heroName = document.createElement('li')
    heroName.innerText = "Name: " + name;
    stats.appendChild(heroName);

    const heroHealth = document.createElement('li')
    heroHealth.innerText = "Health: " + health;
    stats.appendChild(heroHealth);

}

displayEnemyStats(enemy);
displayHeroStats(hero)
