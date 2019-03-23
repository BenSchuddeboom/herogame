//Declaring hero object.
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

//Declaring enemy object.

const enemies = 
[
    {
        name: "Mailman",
        health: {
            max: 10,
            current: 10,
        },
        weapon: {
            type: "Rolled-up paper",
            damage: 1,
        },
        alive: false,
        speed: 500,
        img: "images/herofaces/mailman.jpg"
    },
    {
        name: "Dragon",
        health: {
            max: 20,
            current: 20,
        },
        weapon: {
            type: "Breath",
            damage: 2,
        },
        alive: false,
        speed: 1000,
        img: "images/herofaces/enemy1.jpg" 
    },
    {
        name: "World-eater",
        health: {
            max: 30,
            current: 30,
        },
        weapon: {
            type: "Eats your planet",
            damage: 2,
        },
        alive: false,
        speed: 2000,
        img: "images/herofaces/worldeater.jpg"
    }
]

let enemy = getEnemy(enemies);

//Declaring dagger object.
const dagger = {
    type: "dagger",
    damage: 2,
    imageUrl: "images/dagger.png",
}

const specialBeanCannon = {
    type: "Special-Bean-Cannon",
    damage: 10,
    imageUrl: "images/beamcannong.png",
}

//Makes it so the game doesn't start running on pageload.
let running = false;

//checks wether the hero can rest, and if he can, restores his health.
function rest(hObj) {
    if(hObj.alive && !enemy.alive) {
        if(hObj.health >= 10) {
            alert("Your hero is already fully rested!")
        } else {
            hObj.health = 10;
        }
        displayHeroStats(hero);
        return hObj;
    } else if (enemy.alive && hObj.alive) {
        alert("No resting while fighting!")
    } else {
        alert("No rest for the dead!");
    }
}

//can be applied to the onclick of any element to remove it from screen and add it to the hero's inventory
function pickUpItem(hObj, weapon) {
    hObj.inventory.push(weapon);
    displayHeroStats(hero);
    const dagger = document.getElementById('dagger');
    dagger.remove();
}

//takes the item at index 0 of the hero's inventory and equips it as a weapon.
function equipWeapon(hObj) {
    if(hObj.inventory[0]) {
        hObj.weapon = hObj.inventory[0];
    }
    displayHeroStats(hero);
}

//Displays the hero's current stats on screen.
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

//Displays the enemy's current stats on screen.
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
    speedLi.innerText = "Attacks/second: " + 1000/speed;

    const healthbar = document.querySelector('.enemyHealth');
    currentHealthPerc = (health/healthMax)*100;
    healthbar.style = "width: " + currentHealthPerc + "%;";

}

//Sets the name of the hero object to the user's input.
function changeHeroName(hObj) {
    const input = document.getElementById('input');
    const inputValue = input.value;

    hObj.name = inputValue;

    displayHeroStats(hero);
}

//Deals damage to the enemy based on the current equipped weapon.
function doDamage(target, dealer) {
    if(target.health.current > 0 && dealer.health > 0 && target.alive) {   
        target.health.current = target.health.current - dealer.weapon.damage;
        displayEnemyStats(enemy);
    } else if(target.health.current === 0 && target.alive === true) {
        target.alive = false;
        enemyDies();
    }
}

//Changes the display to show that the enemy has dies, and stops the incoming damage from the enemy.
function enemyDies() {
    window.clearInterval();
    removeEnemyStats();
    changeHeroFace("won");

    const enemyStats = document.getElementById('enemyStats');
    const deadText = document.createElement('li');
    deadText.id = "deadText"
    deadText.innerText = "DEAD"
    enemyStats.appendChild(deadText);
    if(enemies[0]) {
        setTimeout(() => {
            setNewEnemy();
            removeDeadText();
            running = false;
            changeHeroFace();
        },2000)
    }
}

//Just removes the text that says "DEAD" when engaging a new enemy.
function removeDeadText() {
    const deadText = document.getElementById('deadText');
    deadText.remove();
}

//Removes the hero's stats from the screen.
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

//Removes the enemy's stats from the screen.
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

//This is triggered periodically based on a speed interval in setInterval, in order to have the enemy deal damage to the hero.
function enemyDamage(eObj) {
    if(hero.health > 0 && enemy.alive) {
        hero.health = hero.health - eObj.weapon.damage
        displayHeroStats(hero);
    } else if(hero.alive === true && hero.health <= 0) {
        hero.alive = false;
        heroDies();
    }
}

//Does the same thing as enemyDies(), but for the hero.
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

//Changes the hero's avatar based on the outcome of the battle.
function changeHeroFace(state) {
    const avatar = document.getElementById('heroAvatar');
    if (state === "won") {
        avatar.src = "images/herofaces/beanwins.jpg"
    } else if(state === "lost") {
        avatar.src = "images/herofaces/beandead.jpg"
    } else {
        avatar.src = "images/herofaces/bean1.jpg";
    }
}

//Sets the conditions for starting the game, and then triggers the enemy's attack at intervals.
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

function getEnemy(enemiesData) {
    if(enemiesData[0]) {
        const enemy = enemiesData[0];
        return enemy;
    } else {
        return alert("Out of enemies");
    }
}

function setNewEnemy() {
    enemies.shift();
    enemy = getEnemy(enemies);

    enemyAvatar = document.getElementById('enemyAvatar');
    enemyAvatar.src = enemy.img;
    displayEnemyStats(enemy);
}

//initializes some stats.
displayEnemyStats(enemy);
displayHeroStats(hero);



