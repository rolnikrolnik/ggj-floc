class PowerPlant {
    constructor() {
        this.north = new Direction([new House(100, 1, 360, 100)]);
        this.south = new Direction([new House(100, 2, 360, 620) ]);
        this.east = new Direction([new House(100, 3, 620, 360) ]);
        this.west = new Direction([new House(100, 4, 100, 360) ]);
    }

    update() {
        this.north.update('north');
        this.south.update('south');
        this.east.update('east');
        this.west.update('west');
    }
}

class Direction {
    constructor(houses) {
        this.isOpen = false;
        this.houses = houses;
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
    constructor(temp, insulation, x, y) {
        this.temp = temp;
        this.insulation = insulation;
        this.x = x;
        this.y = y;
    }

    decrease() {
        this.temp = this.temp - (HEAT_LOSS - this.insulation);
    }

    increase() {
        this.temp = this.temp++;
    }
}
