class PowerPlant {
    constructor() {
        this.north = new Direction(100, 1);
        this.south = new Direction(100, 2);
        this.east = new Direction(100, 3);
        this.west = new Direction(100, 4);
    }

    update() {
        this.north.update('north');
        this.south.update('south');
        this.east.update('east');
        this.west.update('west');
    }
}

class Direction {
    constructor(temp, ins) {
        this.isOpen = false;
        this.houses = [ new House(temp, ins) ];
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    update(label) {
        this.houses.forEach(house => {
            if (this.isOpen) {
                house.increase();
            } else {
                house.decrease();
            }

            console.log(`${ label } house temp: ${ house.temp } isOpen: ${ this.isOpen }`)

            if (house.temp >= TEMP_MAX || house.temp <= TEMP_MIN) {
                throw "GAME OVER";
            }
        });
    }
}

class House {
    constructor(temp, insulation) {
        this.temp = temp;
        this.insulation = insulation;
    }

    decrease() {
        this.temp = this.temp - (HEAT_LOSS - this.insulation);
    }

    increase() {
        this.temp = this.temp++;
    }
}
