import Express from 'express';

export interface Response<ResBody> extends Express.Response<ResBody> {
}
