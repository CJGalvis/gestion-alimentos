import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css'],
})
export class LoginClientComponent {
  public hide: boolean = true;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      const { email, password } = this.loginForm.value;
      const response = await this.authService.loginUser(email, password);
      if (!response) {
        Swal.fire({
          title: 'Lo sentimos!',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
        });
      } else {
        const obj = JSON.stringify(response);
        const token = btoa(obj);
        localStorage.setItem('token', token);
        this.router.navigate(['client/catalog']);
      }
    } catch (error) {
      Swal.fire({
        title: 'Lo sentimos!',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
      });
    }
  }

  goToRegister() {
    this.router.navigate(['client/register']);
  }
}
