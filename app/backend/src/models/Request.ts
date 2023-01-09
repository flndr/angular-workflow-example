import Express from 'express';

export interface Request<T> extends Express.Request {
    body : T
}
