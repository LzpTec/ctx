import { AsyncContext, ContextToken } from '@lzptec/ctx';
import { randomUUID } from 'crypto';
import express, { Request, Response } from 'express';

const PORT = 8081;

const app = express();
const context = new AsyncContext();

const requestCtx = new ContextToken<Request>();
const responseCtx = new ContextToken<Response>();
const requestIdCtx = new ContextToken<string>();

app.use((req, res, next) => context.run(() => {
    context
        .set(requestCtx, req)
        .set(responseCtx, res)
        .set(requestIdCtx, randomUUID())

    next();
}));

app.get('/', () => {
    const req = context.get(requestCtx)!;
    const res = context.get(responseCtx)!;

    const reqId = context.get(requestIdCtx)!;
    console.info(`Request Id ${reqId}`);

    res.send({
        hello: "world",
        path: req.path
    });
});

app.listen(PORT, () => {
    console.info(`Server up, localhost:${PORT}`)
});