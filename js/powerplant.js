class PowerPlant {
    constructor() {
        this.north = new Direction([new House(50, this.generateHouseIsolation(), this.generateHousePosition(200), 150)]);
        this.south = new Direction([new House(50, this.generateHouseIsolation(), this.generateHousePosition(150), 600) ]);
        this.east = new Direction([new House(50, this.generateHouseIsolation(), 700, this.generateHousePosition(150)) ]);
        this.west = new Direction([new House(50, this.generateHouseIsolation(), 0, this.generateHousePosition(200)) ]);

        this.directions = [ this.north, this.south, this.west, this.east ];

        this.power = POWERPLANT_POWER;

        this.health = 50;
        this.healthIndicator = undefined;

        this.x = MOVE_ALL_X + 350;
        this.y = MOVE_ALL_Y + 350;
    }

    generateHouseIsolation(){
        return Math.floor(Math.random() * Math.floor(5))+1
    }

    generateHousePosition(min){
        return min+(Math.floor(Math.random() * Math.floor(15)))*PIPE_SIZE;
    }

    getNumberOfOpenDirections() {
        return this.directions.filter(d => d.isOpen).length;
    }

    update() {
        const numberOfOpenDirections = this.getNumberOfOpenDirections();
        const powerPerDirection = this.power/numberOfOpenDirections;

        this.directions.forEach(direction => direction.update(powerPerDirection));
        this.updateHealth();
    }

    updateHealth() {
        this.health += ((POWERPLANT_HEALTH_GAIN - this.getNumberOfOpenDirections())*3);
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
        this.y = MOVE_ALL_Y + y;
    }

    decrease() {
        this.temp = this.temp - (HEAT_LOSS - (this.insulation*1.75));
    }

    increase(power) {
        this.temp = this.temp + power;
    }

    createThermometer(thermometer){
        this.thermometer = thermometer;
    }
}
