class PowerPlant {
    constructor() {
        this.north = new Direction();
        this.south = new Direction();
        this.east = new Direction();
        this.west = new Direction();
    }

    update() {
        this.north.update();
        this.south.update();
        this.east.update();
        this.west.update();
    }
}

const TEMP_MIN = 0;
const TEMP_MAX = 100;

class Direction {
    constructor() {
        this.isOpen = false;
        this.houses = [ new House(20, 5) ];
    }

    update() {
        console.log(this)

        if (this.isOpen) {
            this.houses.forEach(house => {
                // up temp
            });
        } else {
            this.houses.forEach(house => {
                house.update();
            });
        }
    }
}

class House {
    constructor(temp, factor) {
        this.temp = temp;
        this.heatFactor = factor;
    }

    update() {
        console.log(this);
    }
}
