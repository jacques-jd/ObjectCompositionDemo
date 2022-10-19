//our base class - character, has health and a name
class Character {
    constructor(name) {
        this.name = name;
        this.health = 100;
    }

    stats() {
        //every character always has a name and health
        console.log(`${this.name}: `);
        console.log(`|- Health: ${this.health}`);

        //check if the other stats are relevant
        if(this.mana)
            console.log(`|- Mana: ${this.mana}`);
        if(this.stamina)
            console.log(`|- Stamina: ${this.stamina}`);
        console.log(`-----------`);
    }
}

//mages have mana and can cast
class Mage extends Character {
    constructor(name) {
        super(name);
        this.mana = 100;
    }

    cast() {
        console.log(`${this.name} shoots fireball!`);
        this.mana--;
    }

    
}

//Warriors have stamina and can punch
class Warrior extends Character {
    constructor(name) {
        super(name);
        this.stamina = 100;
    }

    punch() {
        console.log(`${this.name} punches guy!`);
        this.stamina--;
    }
}

let broseph = new Warrior('Broseph');
broseph.punch();
broseph.stats();

let dumbledore = new Mage('Dumbledore');
dumbledore.cast();
dumbledore.stats();

// that was cool and all. Very useful. But what if we wanted to add a new class?
// a human class that can punch and cast? How do we do that? 
// a class can only inherit from ONE class

console.log('\n\n\n')

// time to create compositions for objects instead

//characters can display stats
const character = state => ({
    stats: () => {
        //every character always has a name and health
        console.log(`${state.name}: `);
        console.log(`|- Health: ${state.health}`);

        //check if the other stats are relevant
        if(state.mana)
            console.log(`|- Mana: ${state.mana}`);
        if(state.stamina)
            console.log(`|- Stamina: ${state.stamina}`);
        console.log(`-----------`);
    }
})

//fighters can punch
const fighter = state => ({
    punch: () => { 
        console.log(`${state.name} punches guy!`);
        state.stamina--;
    }
});

//casters can cast
const caster = state => ({
    cast: () => {
        console.log(`${state.name} electrifies the area!`);
        state.mana--;
    }
});

//time to create "objects"

//warriors can fight, and are characters
const warrior = name => {
    let state = {
        name,
        health: 100,
        stamina: 100
    }

    return {...fighter(state), ...character(state)};
}

//mages can cast, and are characters
const mage = name => {
    let state = {
        name,
        health: 100,
        mana: 100
    }

    return {...caster(state), ...character(state)};
}

//humans are able to cast and fight as well, and are characters
const human = name => {
    let state = {
        name,
        health: 100,
        mana: 100,
        stamina: 100
    }

    return {...fighter(state), ...caster(state), ...character(state)};
}

const electrica = mage('Electrica');
electrica.cast();
electrica.stats();

const tank = warrior('Slasher');
tank.punch();
tank.stats();

const harold = human('Harold');
harold.punch();
harold.cast();
harold.stats();
