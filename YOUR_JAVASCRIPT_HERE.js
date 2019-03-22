// Write your JS here
const hero = {
    name: "Some hero",
    heroic: true,
    inventory: [],
    health: 10,
    weapon: {
        type: "sword",
        damage: 2,
    }
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