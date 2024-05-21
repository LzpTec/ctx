import { ContextToken } from './context-token';

export class Context {
    #map = new Map<ContextToken<unknown>, unknown>();

    /**
     * Store a value in the context. If a value is already present it will be overwritten.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     * @param {T} value The value to store.
     *
     * @returns {Context} this.
     */
    set<T>(token: ContextToken<T>, value: T): Context {
        this.#map.set(token, value);
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
    get<T>(token: ContextToken<T>): T {
        if (!this.#map.has(token))
            this.#map.set(token, token.default());

        return this.#map.get(token) as T;
    }

    /**
     * Check if there is a value associated with the provided token.
     *
     * @template T
     * @param {ContextToken<T>} token The reference to an instance of `ContextToken`.
     *
     * @returns {boolean}
     */
    has<T>(token: ContextToken<T>): boolean {
        return this.#map.has(token);
    }

    /**
     * Delete the value associated with the given token.
     *
     * @param {ContextToken<unknown>} token The reference to an instance of `ContextToken`.
     *
     * @returns {Context} this.
     */
    delete(token: ContextToken<unknown>): Context {
        this.#map.delete(token);
        return this;
    }

}
