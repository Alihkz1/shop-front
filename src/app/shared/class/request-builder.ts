import { Injector } from "@angular/core";
import { ClientService } from "../service/client.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../env/environment";
import { Observable, catchError, of, tap } from "rxjs";
import { ParamsHandler } from "./params-handler";

export function Api(): RequestBuilder {
    return new RequestBuilder()
}
export const ServiceLocator: { injector?: Injector } = {};

export class RequestBuilder {
    clientService: ClientService | undefined;
    httpClient: HttpClient | undefined;
    requestOptions: { headers?: HttpHeaders, params: any };

    private request: IRequest = {
        method: "get",
        action: '',
        pathVariable: '',
        body: null,
        params: null,
        controller: '',
        version: 'v1',
    };

    constructor() {
        this.clientService = ServiceLocator.injector?.get(ClientService)
        this.requestOptions = { params: this.request.body }
        if (this.clientService?.isLogin)
            this.requestOptions = {
                ...this.requestOptions,
                headers: new HttpHeaders().append("Authorization", "Bearer " + this.clientService.getUser.token),
            }
    }

    public get(): this { this.request.method = 'get'; return this }
    public post(): this { this.request.method = 'post'; return this }
    public put(): this { this.request.method = 'put'; return this }
    public delete(): this { this.request.method = 'delete'; return this }

    public body(body: any): this {
        this.request.body = body;
        return this
    }

    public param(params: any): this {
        const urlParams = new ParamsHandler(params)
        this.request.params = urlParams.urlParameters();
        return this
    }

    public controller(controller: string): this {
        this.request.controller = controller;
        return this
    }

    public action(action: string): this {
        this.request.action = action;
        return this
    }

    public pathVariable(variable: string): this {
        this.request.pathVariable = variable;
        return this
    }

    public version(version: string): this {
        this.request.version = version;
        return this
    }

    public call(): any {
        let url = environment.API_BASE + this.request.version + '/' + this.request.controller;

        if (this.request.action.length)
            url += '/' + this.request.action;
        if (this.request.pathVariable.length)
            url += '/' + this.request.pathVariable;

        switch (this.request.method) {
            case 'post':
                return this.clientService?.http
                    .post(url, this.request.body, this.requestOptions)
                    .pipe(
                        catchError((error) => this.errorHandler(error)),
                        tap(({ success }) => { if (!success) this.toastUnsuccess() })
                    )
            case 'get':
                return this.clientService?.http
                    .get(this.request.params ? url + '?' + this.request.params : url, this.requestOptions)
                    .pipe(
                        catchError((error) => this.errorHandler(error)),
                        tap(({ success }) => { if (!success) this.toastUnsuccess() })
                    )
            case 'put':
                return this.clientService?.http
                    .put(url, this.request.body, this.requestOptions)
                    .pipe(
                        catchError((error) => this.errorHandler(error)),
                        tap(({ success }) => { if (!success) this.toastUnsuccess() })
                    )
            case 'delete':
                return this.clientService?.http
                    .delete(url, { ...this.requestOptions, body: this.request.body })
                    .pipe(
                        catchError((error) => this.errorHandler(error)),
                        tap(({ success }) => { if (!success) this.toastUnsuccess() })
                    )
        }
    }

    private errorHandler(error: HttpErrorResponse): Observable<any> {
        const { status } = error;
        if (status === 403) {
            this.clientService?.router.navigate(['auth/login'])
            this.clientService?.message.create('error', "لطفا وارد حساب کاربری خود شوید")
            this.clientService?.logout()
        }
        if (status === 400) {
            this.clientService?.message.create('error', error.error.message)
        }
        return of(error.error);
    }

    private toastUnsuccess(): void {
        this.clientService?.message.create('error', 'خطای سرور')
    }

}

export type requestType = 'get' | 'post' | 'put' | 'delete';
export interface IRequest {
    method: requestType;
    body?: any;
    params?: any;
    controller: string;
    action: string;
    pathVariable: string;
    version?: string;
}