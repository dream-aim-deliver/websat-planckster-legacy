export type BaseSuccessDTO<T> = {
    success: true;
    data: T;
}

export type BaseErrorDTO = {
    success: false;
    msg: string;
}

export type BaseDTO<T> = BaseSuccessDTO<T> | BaseErrorDTO;