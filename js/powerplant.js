class PowerPlant {
    constructor() {
        this.north = {  isOpen: false,  houses: []    };
        this.south = {  isOpen: false,  houses: []    };
        this.east = {  isOpen: false,  houses: []    };
        this.west = {  isOpen: false,  houses: []    };
    }
}

const TEMP_MIN = 0;
const TEMP_MAX = 100;

class House {
    constructor(temp, factor) {
        this.temp = temp;
        this.heatFactor = factor;
    }
}
