import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();

constructor(private http: Http) { }

login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions())
        .map((response: Response) => {
        const user = response.json();
        if (user) {
            localStorage.setItem('token', user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.userToken = user.tokenString;
        }
        });
}

register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions());
}

private requestOptions() {
    const headers = new Headers({'Content-type': 'application/json'});
    return new RequestOptions({ headers: headers });
}

loggedIn() {
    return tokenNotExpired('token');
}

private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
        return IfObservable.throw(applicationError);
    }
    const serverError = error.json();
    // tslint:disable-next-line:prefer-const
    let modelStateErrors = '';
    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
            }
        }
    }
    return IfObservable.throw(
        modelStateErrors || 'Server error'
    );

}
}
