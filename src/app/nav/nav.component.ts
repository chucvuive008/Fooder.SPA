import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('success login');
    }, error => {
      console.log('loggin fail');
    }, () => {
      this.router.navigate(['/restaurants']);
    });
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('register success');
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

}
