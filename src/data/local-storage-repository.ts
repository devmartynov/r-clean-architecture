export default class LocalStorageRepository {
    storageKey: string;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
    }

    protected readDataFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        } catch (e) {
            console.error('Error writing to localStorage', e);
            return {};
        }
    }

    protected writeDataToLocalStorage<T>(data: Record<string, T>) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error('Error writing to localStorage', e);
        }
    }
}
