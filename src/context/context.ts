export class ContextToken<T> {
    #defaultValue: () => (T | undefined);

    constructor(defaultValue?: () => T) {
        if (typeof defaultValue === 'function')
            this.#defaultValue = defaultValue;
        else
            this.#defaultValue = () => undefined;
    }

    get default(): () => (T | undefined) {
        return this.#defaultValue;
    }
}

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

    /**
     * @returns {Array<ContextToken<unknown>>} a list of tokens currently stored in the context.
     */
    keys(): Array<ContextToken<unknown>> {
        return [...this.#map.keys()];
    }
}

