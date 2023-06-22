import { AsyncLocalStorage } from 'async_hooks';
import { Context } from './context';
import { ContextToken } from './context-token';

export class AsyncContext {
    readonly #storage: AsyncLocalStorage<Context> = new AsyncLocalStorage();

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
        return this.#storage.run(new Context(), callback);
    }

    #getStore() {
        const storage = this.#storage.getStore();
        if (!storage)
            throw new ReferenceError('Cannot access any value outside of context');

        return storage;
    }

    /**
     * Store a value in the context. If a value is already present it will be overwritten.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     * @param {T} value The value to store.
     *
     * @returns {Context} this.
     */
    public set<T>(token: ContextToken<T>, value: T): AsyncContext {
        this.#getStore().set(token, value);
        return this;
    }

    /**
     * Retrieve the value associated with the given token.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     *
     * @returns {T} The stored value or default.
     */
    public get<T>(token: ContextToken<T>): T | undefined {
        return this.#getStore().get(token);
    }

    /**
     * Check if there is a value associated with the provided token.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     *
     * @returns {boolean}
     */
    public has<T>(token: ContextToken<T>): boolean {
        return this.#getStore().has(token);
    }

    /**
     * Delete the value associated with the given token.
     *
     * @param {ContextToken<unknown>} token The reference to an instance of `ContextToken`.
     *
     * @returns {Context} this.
     */
    public delete(token: ContextToken<unknown>): AsyncContext {
        this.#getStore().delete(token);
        return this;
    }

    /**
     * @returns {Array<ContextToken<unknown>>} a list of tokens currently stored in the context.
     */
    public keys(): Array<ContextToken<unknown>> {
        return this.#getStore().keys();
    }

}
