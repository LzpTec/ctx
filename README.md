```ts

import {AsyncCTX, AsyncContext, ContextToken, Context} from '@lzptec/ctx';

const token = new ContextToken<number>();
const tokenWithDefault = new ContextToken<number>(() => 123);

class Main{

    private context = new AsyncContext();

    private async run(){
        context.run(runInContext);
    }

    private async runInContext(){
        context.set(token, 987);
        sec();
    }

    private async sec(){
        const t = context.get(token);
        console.log(t); // 987
    }

}

new Main().run();

```
