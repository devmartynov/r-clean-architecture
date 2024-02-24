export function convertSecondsToHHMMSS(time: number) {
    return new Date(time * 1000).toISOString().slice(11, 19);
}
