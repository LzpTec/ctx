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

    #getStorageSafe() {
        const storage = this.#storage.getStore();
        return storage;
    }

    #getStorage() {
        const storage = this.#getStorageSafe();

        if (!storage)
            throw new ReferenceError('Cannot access any value outside of context');

        return storage;
    }

    /**
     * Store a value in the context. If a value is already present it will be overwritten.
     * Safe Version.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     * @param {T} value The value to store.
     *
     * @returns {Context} this.
     */
    public setSafe<T>(token: ContextToken<T>, value: T): AsyncContext {
        this.#getStorageSafe()?.set(token, value);
        return this;
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
        this.#getStorage().set(token, value);
        return this;
    }

    /**
     * Retrieve the value associated with the given token.
     * Safe Version.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     *
     * @returns {T} The stored value, default or undefined.
     */
    public getSafe<T>(token: ContextToken<T>): T | undefined {
        return this.#getStorageSafe()?.get(token);
    }

    /**
     * Retrieve the value associated with the given token.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     *
     * @returns {T} The stored value or default.
     */
    public get<T>(token: ContextToken<T>): T {
        return this.#getStorage().get(token);
    }

    /**
     * Check if there is a value associated with the provided token.
     * Safe Version.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     *
     * @returns {boolean}
     */
    public hasSafe<T>(token: ContextToken<T>): boolean {
        return this.#getStorageSafe()?.has(token) ?? false;
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
        return this.#getStorage().has(token);
    }

    /**
     * Delete the value associated with the given token.
     * Safe Version.
     *
     * @param {ContextToken<unknown>} token The reference to an instance of `ContextToken`.
     *
     * @returns {Context} this.
     */
    public deleteSafe(token: ContextToken<unknown>): AsyncContext {
        this.#getStorageSafe()?.delete(token);
        return this;
    }

    /**
     * Delete the value associated with the given token.
     *
     * @param {ContextToken<unknown>} token The reference to an instance of `ContextToken`.
     *
     * @returns {Context} this.
     */
    public delete(token: ContextToken<unknown>): AsyncContext {
        this.#getStorage().delete(token);
        return this;
    }

    /**
     * Safe Version.
     * 
     * @returns {Array<ContextToken<unknown>>} a list of tokens currently stored in the context.
     */
    public keysSafe(): Array<ContextToken<unknown>> {
        return this.#getStorageSafe()?.keys() ?? [];
    }

    /**
     * @returns {Array<ContextToken<unknown>>} a list of tokens currently stored in the context.
     */
    public keys(): Array<ContextToken<unknown>> {
        return this.#getStorage().keys();
    }

}
