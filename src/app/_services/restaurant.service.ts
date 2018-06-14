import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantService {
baseUrl = environment.apiUrl;

constructor(private http: Http) { }

register(model: any) {
    return this.http.post(this.baseUrl + 'restaurants/register', model, this.requestOptions()).catch(this.handleError);
}

private requestOptions() {
    const headers = new Headers({'content-type': 'application/json'});
    return new RequestOptions({headers: headers});
}

private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
        return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateErrors += serverError[key] + '/n';
            }
        }
    }
    return Observable.throw(modelStateErrors || 'Server error');
}
}
