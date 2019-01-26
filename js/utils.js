function calculateTime(timing) {
    const days = Math.floor(timing/24);
    hours = timing - days*24;
    return {days: days, hours: hours};
}