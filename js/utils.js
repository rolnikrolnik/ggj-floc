function calculateTime(timing) {
    let hours = Math.floor(timing/60);
    const minutes = timing - hours*60;
    const days = Math.floor(hours/24);
    hours = hours - days*24;
    return {days: days, hours: hours, minutes: minutes};
}