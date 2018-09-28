import { Injectable } from '@angular/core';
import {
    Headers,
    Http,
    RequestOptions,
    URLSearchParams,
    Response,
    ResponseContentType
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
    // public host = '';
    public host = 'http://18.224.29.123:8080';
    // public host = 'http://kyrapps.com:9008';
    constructor(
        public http: Http
    ) { }

    public search(url: string, element: any): Observable<any> {
        let options: RequestOptions;
        let params: URLSearchParams;

        params = new URLSearchParams();

        for (let key in element) {
            if (element.hasOwnProperty(key)) {
                params.set(key, element[key]);
            }
        }

        options = new RequestOptions({ search: params });
        return this.http.get(this.host+url, options)
            .map(response => response.json());
    }


    public post(url: string, element: any): Promise<any> {
        return this.http.post(this.host+url, JSON.stringify(element))
            .toPromise()
            .then(response => response.json() as any)
            .catch(this.handleError);
    }

    public put(url: string, element: any): Promise<any> {
        console.log('element',element);
        return this.http.put(this.host+url, JSON.stringify(element))
            .toPromise()
            .then(response => response.json() as any)
            .catch(this.handleError);
    }

    public postFile(url: string, element: any): Promise<any> {
        return this.http.post(this.host+url, JSON.stringify(element), { responseType: ResponseContentType.Blob })
            .toPromise()
            .then(response => response.json() as any)
            .catch(this.handleError);
    }

    public getAll(url: string): Promise<any[]> {
        return this.http.get(this.host+url)
            .toPromise()
            .then(response => response.json() as any[])
            .catch(this.handleError);
    }

    public get(url: string): Observable<any> {
        console.log('url',this.host+url);
        return this.http.get(this.host+url)
            .map(response => response.json())
            .catch((e: any) => { console.log(e); return Observable.throw(e || 'Internal Server error');});
    }

    // public get(url: string): Promise<any> {
    //     console.log('url',url);
    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json() as any)
    //         .catch(this.handleError);
    // }

    public delete(url: string, element?: any): Promise<any> {
        if (element) {
            return this.http.delete(this.host+url, new RequestOptions({ body: element }))
                .toPromise()
                .then(response => response.json() as any)
                .catch(this.handleError);
        } else {
            return this.http.delete(this.host+url)
                .toPromise()
                .then(response => response.json() as any)
                .catch(this.handleError);
        }
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}