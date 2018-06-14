import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_model/User';
import { AuthService } from '../_services/auth.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';


@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService,
        private router: Router,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).catch(error => {
            console.log('Problem retrieving data');
            this.router.navigate(['/retaurants']);
            return Observable.of(null);
        });
    }
}
