export type INotifyService = {
    notify: (text: string) => void,
    error: (text: string) => void,
    success: (text: string) => void,
}
