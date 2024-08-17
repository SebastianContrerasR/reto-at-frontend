export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    return chunks;
}

export const calculateTimeDifference = (departure: string, arrival: string): string => {
    const departureDate: Date = new Date(departure);
    const arrivalDate: Date = new Date(arrival);
    const differenceMs: number = arrivalDate.getTime() - departureDate.getTime();

    const minutes: number = Math.floor(differenceMs / (1000 * 60)) % 60;
    const hours: number = Math.floor(differenceMs / (1000 * 60 * 60));

    return `${hours}h ${minutes}m`;
};