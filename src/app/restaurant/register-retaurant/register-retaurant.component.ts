import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../_model/Restaurant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from '../../_services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-retaurant',
  templateUrl: './register-retaurant.component.html',
  styleUrls: ['./register-retaurant.component.css']
})
export class RegisterRetaurantComponent implements OnInit {
  restaurant: Restaurant;
  registerForm: FormGroup;

  constructor(private restaurantService: RestaurantService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        website: '',
        phoneNumber: ['', Validators.required],
        description: ['', Validators.required],
        type: [''],
        street: ['', Validators.required],
        suite: '',
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip5: ['', Validators.required]
      }
    );
  }

  register() {
    if (this.registerForm.valid) {
      this.restaurant = Object.assign({}, this.registerForm.value);
      this.restaurantService.register(this.restaurant).subscribe(() => {
        console.log('Registration a new restaurant successful');
        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
      });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
