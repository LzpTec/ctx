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
     * @returns {T | undefined}
     */
    get = <T>(token: ContextToken<T>): T | undefined => this.getStore().get(token);

    /**
     * 
     * @template T
     * @param {ContextToken<T>} token 
     * @param {T} value
     * @returns {import('./context').Context | undefined}
     */
    set = <T>(token: ContextToken<T>, value: T): Context | undefined => this.getStore().set(token, value);

    /**
     * 
     * @param {ContextToken<unknown>} token 
     * @returns {import('./context').Context | undefined}
     */
    delete = (token: ContextToken<unknown>): Context | undefined => this.getStore().delete(token);

    /**
     * @returns {Array<ContextToken<unknown>> | undefined} a list of tokens currently stored in the context.
     */
    keys = (): Array<ContextToken<unknown>> | undefined => this.getStore().keys();

}

export const AsyncCTX = new AsyncContext();