// Write your JS here
const hero = {
    name: "Bean",
    heroic: true,
    inventory: [],
    health: 10,
    weapon: {
        type: "Teddy",
        damage: 2,
    },
    alive: true,
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
        damage: 1,
    },
    alive: false,
    speed: 300,
}

const dagger = {
    type: "dagger",
    damage: 2,
    imageUrl: "images/dagger.png",
}

function rest(hObj) {
    if(hObj.alive && !enemy.alive) {
        if(hObj.health >= 10) {
            alert("Your hero is already fully rested!")
        } else {
            hObj.health = 10;
        }
        displayHeroStats(hero);
        return hObj;
    } else if (enemy.alive) {
        alert("No resting while fighting!")
    } else {
        alert("No rest for the dead!");
    }
}

function pickUpItem(hObj, weapon) {
    hObj.inventory.push(weapon);
    displayHeroStats(hero);
    const dagger = document.getElementById('dagger');
    dagger.remove();
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
    const speed = eObj.speed;

    const weaponLi = document.getElementById('enemyWeapon');
    const damageLi = document.getElementById('enemyDamage');
    const nameLi = document.getElementById('enemyName');
    const healthLi = document.getElementById('enemyHealth');
    const speedLi = document.getElementById('enemySpeed');

    weaponLi.innerText = "Weapon: " + weaponType;
    damageLi.innerText = "Damage: " + weaponDamage;
    nameLi.innerText = "Name: " + name;
    healthLi.innerText = "Health: " + health;
    speedLi.innerText = "Attacks/second: " + speed/100;

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
    if(target.health.current > 0 && dealer.health > 0 && target.alive) {   
        target.health.current = target.health.current - dealer.weapon.damage;
        displayEnemyStats(enemy);
    } else if(target.health.current === 0 && target.alive === true) {
        target.alive = false;
        enemyDies();
    }
}

function enemyDies() {
    window.clearInterval();
    removeEnemyStats();
    changeHeroFace("won");

    const enemyStats = document.getElementById('enemyStats');
    const deadText = document.createElement('li');
    deadText.id = "deadText"
    deadText.innerText = "DEAD"
    enemyStats.appendChild(deadText);

}

function removeHeroStats() {
    const weaponLi = document.getElementById('heroWeapon');
    const damageLi = document.getElementById('heroDamage');
    const nameLi = document.getElementById('heroName');
    const healthLi = document.getElementById('heroHealth');

    weaponLi.innerText = ""
    damageLi.innerText = ""
    nameLi.innerText = ""
    healthLi.innerText = ""
}

function removeEnemyStats() {
    const weaponLi = document.getElementById('enemyWeapon');
    const damageLi = document.getElementById('enemyDamage');
    const nameLi = document.getElementById('enemyName');
    const healthLi = document.getElementById('enemyHealth');
    const speedLi = document.getElementById('enemySpeed');

    weaponLi.innerText = ""
    damageLi.innerText = ""
    nameLi.innerText = ""
    healthLi.innerText = ""
    speedLi.innerText = ""
}

function enemyDamage(eObj) {
    if(hero.health > 0 && enemy.alive) {
        hero.health = hero.health - eObj.weapon.damage
        displayHeroStats(hero);
    } else if(hero.alive === true && hero.health <= 0) {
        hero.alive = false;
        heroDies();
    }
}

function heroDies() {
    window.clearInterval();
    removeHeroStats()
    changeHeroFace("lost");

    const heroStats = document.getElementById('heroStats');
    const deadText = document.createElement('li');
    deadText.id = "deadText"
    deadText.innerText = "DEAD"
    heroStats.appendChild(deadText);
}

function changeHeroFace(wonLost) {
    const avatar = document.getElementById('heroAvatar');
    if (wonLost === "won") {
        avatar.src = "images/herofaces/beanwins.jpg"
    } else if(wonLost === "lost") {
        avatar.src = "images/herofaces/beandead.jpg"
    }
}

function startGame() {
    if(!running) {
        running = true;
        enemy.alive = true;
        setInterval(function() {
            enemyDamage(enemy);
        }, enemy.speed);
    } else {
        alert("game already running")
    }
}

displayEnemyStats(enemy);
displayHeroStats(hero);

let running = false;


