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