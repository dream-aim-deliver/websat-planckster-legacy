
/**
 * Represents a base success view model.
 * @template TData - The type of data associated with the view model.
 */
export type BaseSuccessViewModel<TData> = {
    status: "success";
    data: TData;
}

/**
 * Represents a base error view model.
 */
export type BaseErrorViewModel = {
    status: "error";
    message: string;
    title: string;
}

/**
 * Represents a base warning view model.
 */
export type BaseWarningViewModel = {
    status: "warning";
    message: string;
    title: string;
}

/**
 * Represents a base view model that can either be a success view model, an error view model, or a warning view model.
 * @template TData - The type of data associated with the view model.
 */
export type BaseViewModel<TData> = BaseSuccessViewModel<TData> | BaseErrorViewModel | BaseWarningViewModel;