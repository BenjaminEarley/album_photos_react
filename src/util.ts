import {Observable, Subscription} from "rxjs";

export function onEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

export async function get<T>(
    path: string,
    args: RequestInit = {method: "get"}
): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
}

async function http<T>(
    request: RequestInfo
): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(
        request
    );

    try {
        // may error if there is no body
        response.parsedBody = await response.json();
    } catch (ex) {
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

export interface HttpResponse<T> extends Response {
    parsedBody?: T;
}