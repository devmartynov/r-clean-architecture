export function generateUid() {
    return Math.random().toString();
}

export function isInToday(inputDate: Date) {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) === inputDate.setHours(0, 0, 0, 0);
}
