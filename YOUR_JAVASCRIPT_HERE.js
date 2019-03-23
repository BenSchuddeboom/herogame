// Write your JS here
const hero = {
    name: "Bean",
    heroic: true,
    inventory: [],
    health: 10,
    weapon: {
        type: "Teddy",
        damage: 2,
    }
}

const enemy = {
    name: "Dragon",
    inventory: [],
    health: {
        max: 30,
        current: 30,
    },
    weapon: {
        type: "Breath",
        damage: 3,
    },
    alive: true,
}

const dagger = {
    type: "dagger",
    damage: 2,
    imageUrl: "images/dagger.png",
}

function rest(hObj) {
    if(hObj.health >= 10) {
        alert("Your hero is already fully rested!")
    } else {
        hObj.health = 10;
    }
    displayHeroStats(hero);
    return hObj;
}

function pickUpItem(hObj, weapon) {
    hObj.inventory.push(weapon);
    displayHeroStats(hero);
}

function equipWeapon(hObj) {
    if(hObj.inventory[0]) {
        hObj.weapon = hObj.inventory[0];
    }
    displayHeroStats(hero);
}

function displayHeroStats(hObj) {
    const weaponType = hObj.weapon.type;
    const weaponDamage = hObj.weapon.damage;
    const name = hObj.name;
    const health = hObj.health;

    const weaponLi = document.getElementById('heroWeapon');
    const damageLi = document.getElementById('heroDamage');
    const nameLi = document.getElementById('heroName');
    const healthLi = document.getElementById('heroHealth');

    weaponLi.innerText = "Weapon: " + weaponType;
    damageLi.innerText = "Damage: " + weaponDamage;
    nameLi.innerText = "Name: " + name;
    healthLi.innerText = "Health: " + health;

    const healthbar = document.querySelector('.heroHealth');
    currentHealthPerc = (health/10)*100;
    healthbar.style = "width: " + currentHealthPerc + "%;";
}

function displayEnemyStats(eObj) {
    const weaponType = eObj.weapon.type;
    const weaponDamage = eObj.weapon.damage;
    const name = eObj.name;
    const health = eObj.health.current;
    const healthMax = eObj.health.max;

    const weaponLi = document.getElementById('enemyWeapon');
    const damageLi = document.getElementById('enemyDamage');
    const nameLi = document.getElementById('enemyName');
    const healthLi = document.getElementById('enemyHealth');

    weaponLi.innerText = "Weapon: " + weaponType;
    damageLi.innerText = "Damage: " + weaponDamage;
    nameLi.innerText = "Name: " + name;
    healthLi.innerText = "Health: " + health;

    const healthbar = document.querySelector('.enemyHealth');
    currentHealthPerc = (health/healthMax)*100;
    healthbar.style = "width: " + currentHealthPerc + "%;";

}

function changeHeroName(hObj) {
    const input = document.getElementById('input');
    const inputValue = input.value;

    hObj.name = inputValue;

    displayHeroStats(hero);
}

function doDamage(target, dealer) {
    if(target.health.current > 0) {   
        target.health.current = target.health.current - dealer.weapon.damage;
        displayEnemyStats(enemy);
    } else if(target.health.current === 0 && target.alive === true) {
        target.alive = false;
        enemyDies();
    }
}

function enemyDies() {
    const weaponLi = document.getElementById('enemyWeapon');
    const damageLi = document.getElementById('enemyDamage');
    const nameLi = document.getElementById('enemyName');
    const healthLi = document.getElementById('enemyHealth');

    weaponLi.innerText = ""
    damageLi.innerText = ""
    nameLi.innerText = ""
    healthLi.innerText = ""
    
    const enemyStats = document.getElementById('enemyStats');
    const deadText = document.createElement('li');
    deadText.id = "deadText"
    deadText.innerText = "DEAD"
    enemyStats.appendChild(deadText);

}



displayEnemyStats(enemy);
displayHeroStats(hero);
