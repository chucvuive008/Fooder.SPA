import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { User } from '../_model/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  modalLogin: BsModalRef;
  modalRegister: BsModalRef;
  registerForm: FormGroup;
  loginForm: FormGroup;
  user: User;

  constructor(private authService: AuthService, private router: Router,
          private modalService: BsModalService, private fb: FormBuilder, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        street: [''],
        apt: '',
        city: '',
        state: '',
        zip5: '',
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator}
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch' : true};
  }

  openLoginModal(template: TemplateRef<any>) {
    this.modalLogin = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.modalRegister = this.modalService.show(template,  {ignoreBackdropClick: true});
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('success login');
      this.modalLogin.hide();
    }, error => {
      console.log('loggin fail');
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.registerForm.reset();
        this.modalRegister.hide();
        console.log('Registration successful');
      }, error => {
        console.log (error);
      });
    }
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
