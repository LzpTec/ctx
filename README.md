# @lzptec/ctx [WIP]
## Dead Simple Context Manager

```ts
import { AsyncCTX, AsyncContext, ContextToken, Context } from '@lzptec/ctx';

const token = new ContextToken<number>();
const tokenWithDefault = new ContextToken<number>(() => 123);
const context = new AsyncContext();

const printContextValue = () => {
    console.log(context.get(token));
};

const run = () => {
    await context.run(() => {
        // Async Context
        context.set(token, 987);
        printContextValue(); // Print token value 987
    });

    // Outside Async Context 
    printContextValue(); // Print undefined
};

run();

```
