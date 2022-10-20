# @lzptec/ctx
## Dead Simple Context Manager

```ts
import { AsyncCTX, AsyncContext, ContextToken, Context } from '@lzptec/ctx';

const token = new ContextToken<number>();
const tokenWithDefault = new ContextToken<number>(() => 123);

class Main {
    private context = new AsyncContext();

    private async run(){
        this.context.run(() => runInContext());
    }

    private async runInContext(){
        this.context.set(token, 987);
        sec();
    }

    private async sec(){
        console.log(this.context.get(token)); // 987
    }

}

```
