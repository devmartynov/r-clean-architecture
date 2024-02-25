export function generateUid() {
    return Math.random().toString();
}

export function isInToday(inputDate: Date) {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) === inputDate.setHours(0, 0, 0, 0);
}

/**
 * Преобразование timestamp в дату в формате "гггг-мм-дд"
 */
export function convertTimeToYYYYMMDD(time: number) {
    return new Date(time).toISOString().split('T')[0];
}
