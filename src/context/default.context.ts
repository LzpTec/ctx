import { AsyncLocalStorage } from 'async_hooks';
import { Context, ContextToken } from './context';

export class AsyncContext {
    static readonly Storage: AsyncLocalStorage<Context> = new AsyncLocalStorage();

    /**
     * @template T
     * @callback RunCallback
     * @returns {T | Promise<T>}
     */

    /**
     * 
     * @param {RunCallback} callback 
     */
    run<T = any>(callback: () => T | Promise<T>) {
        AsyncContext.Storage.run(new Context(), callback);
    }

    /**
     * 
     * @template T
     * @param {ContextToken<T>} token 
     * @returns {T | undefined}
     */
    get = <T>(token: ContextToken<T>): T | undefined => AsyncContext.Storage.getStore()?.get(token);

    /**
     * 
     * @template T
     * @param {ContextToken<T>} token 
     * @param {T} value
     * @returns {import('./context').Context | undefined}
     */
    set = <T>(token: ContextToken<T>, value: T): Context | undefined => AsyncContext.Storage.getStore()?.set(token, value);

    /**
     * 
     * @param {ContextToken<unknown>} token 
     * @returns {import('./context').Context | undefined}
     */
    delete = (token: ContextToken<unknown>): Context | undefined => AsyncContext.Storage.getStore()?.delete(token);

    /**
     * @returns {Array<ContextToken<unknown>> | undefined} a list of tokens currently stored in the context.
     */
    keys = (): Array<ContextToken<unknown>> | undefined => AsyncContext.Storage.getStore()?.keys();

}

export const AsyncCTX = new AsyncContext();