import test from 'ava';
import { AsyncContext, Context, ContextToken } from './src';

const token = new ContextToken<number>();
const tokenWithDefault = new ContextToken<number>(() => 123);
const asyncContext = new AsyncContext();

test('Async Context', async (t) => {
    class AsyncContextExample {
        async run() {
            asyncContext.run(() => this.runInContext());
            // Outside async context
            t.throws(() => asyncContext.get(token));
        }

        private async runInContext() {
            asyncContext.set(token, 987);
            this.sec();
        }

        private async sec() {
            t.is(asyncContext.get(token), 987);
            t.is(asyncContext.get(tokenWithDefault), 123);
        }
    }

    await new AsyncContextExample().run();
    t.pass();
});

test('Sync Context', async (t) => {
    class ContextExample {
        run() {
            const context = new Context();
            context.set(token, 5565);
            this.runWithContext(context);
        }

        private runWithContext(ctx: Context) {
            t.is(ctx.get(token), 5565);
            t.is(ctx.get(tokenWithDefault), 123);
            ctx.set(token, 987);
            ctx.set(tokenWithDefault, 999);
            this.sec(ctx);
        }

        private sec(ctx: Context) {
            t.is(ctx.get(token), 987);
            t.is(ctx.get(tokenWithDefault), 999);
            ctx.delete(tokenWithDefault);
            t.is(ctx.get(tokenWithDefault), 123);
        }
    }

    new ContextExample().run();
    t.pass();
});
