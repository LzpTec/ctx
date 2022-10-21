import { AsyncLocalStorage } from 'async_hooks';
import { Context, ContextToken } from './context';

export class AsyncContext {
    private readonly storage: AsyncLocalStorage<Context> = new AsyncLocalStorage();

    /**
     * @template T
     * @callback RunCallback
     * @returns {T | Promise<T>}
     */

    /**
     * 
     * @param {RunCallback} callback 
     * @returns {T | Promise<T>}
     */
    run<T = any>(callback: () => T | Promise<T>): T | Promise<T> {
        return this.storage.run(new Context(), callback);
    }

    private getStore() {
        const storage = this.storage.getStore();
        if (!storage)
            throw new ReferenceError('Cannot access the context(Outside of context)');

        return storage;
    }

    /**
     * 
     * @template T
     * @param {ContextToken<T>} token 
     * @param {T} value
     * @returns {AsyncContext | undefined}
     */
    public set<T>(token: ContextToken<T>, value: T): AsyncContext {
        this.getStore().set(token, value);
        return this;
    }

    /**
     * 
     * @template T
     * @param {ContextToken<T>} token 
     * @returns {T | undefined}
     */
    public get<T>(token: ContextToken<T>): T | undefined {
        return this.getStore().get(token);
    }

    /**
     * 
     * @param {ContextToken<unknown>} token 
     * @returns {AsyncContext | undefined}
     */
    public delete(token: ContextToken<unknown>): AsyncContext {
        this.getStore().delete(token);
        return this;
    }

    /**
     * @returns {Array<ContextToken<unknown>> | undefined} a list of tokens currently stored in the context.
     */
    public keys(): Array<ContextToken<unknown>> {
        return this.getStore().keys();
    }

}

export const AsyncCTX = new AsyncContext();