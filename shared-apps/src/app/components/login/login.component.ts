import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class LoginComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      userName: new FormControl('1'),
      password: new FormControl('2')
    })
  }
}
