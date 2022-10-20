import { ContextToken } from './context';

export class Rota<TRequest, TResponse>{
    public readonly REQUEST_CTX: ContextToken<TRequest> = new ContextToken();
    public readonly RESPONSE_CTX: ContextToken<TResponse> = new ContextToken();
}
