class PowerPlant {
    constructor() {
        this.north = new Direction([new House(100, 1, 360, 100)]);
        this.south = new Direction([new House(100, 2, 360, 620) ]);
        this.east = new Direction([new House(100, 3, 620, 360) ]);
        this.west = new Direction([new House(100, 4, 100, 360) ]);

        this.directions = [ this.north, this.south, this.west, this.east ];

        this.power = POWERPLANT_POWER;

        this.health = 50;
    }

    getNumberOfOpenDirections() {
        return this.directions.filter(d => d.isOpen).length;;
    }

    update() {
        const numberOfOpenDirections = this.getNumberOfOpenDirections();
        const powerPerDirection = this.power/numberOfOpenDirections;

        this.directions.forEach(direction => direction.update(powerPerDirection));
        this.updateHealth();
    }

    updateHealth() {
        this.health += (POWERPLANT_HEALTH_GAIN - this.getNumberOfOpenDirections());
        console.log(`Plant health: ${this.health}`);
        if (this.health >= 100 || this.health <= 0) {
            throw "GAME OVER";
        }
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

    update(power) {
        this.houses.forEach(house => {
            if (this.isOpen) {
                house.increase(power);
            } else {
                house.decrease();
            }

            // console.log(`house temp: ${ house.temp } isOpen: ${ this.isOpen }`)
            //calculate power per house

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
        this.x = MOVE_ALL_X + x;
        this.y = y;
    }

    decrease() {
        this.temp = this.temp - (HEAT_LOSS - this.insulation);
    }

    increase(power) {
        this.temp = this.temp + power;
    }

    createThermometer(thermometer){
        this.thermometer = thermometer;
    }
}
