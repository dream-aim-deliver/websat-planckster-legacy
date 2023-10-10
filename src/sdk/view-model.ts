// A ViewModel that tells a React Component how to render itself.
// The BaseViewModel is the base of all ViewModels.
export type BaseViewModel = {
    status: boolean,
    message?: string,
}