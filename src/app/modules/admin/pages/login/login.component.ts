import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public hide: boolean = true;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .then((data: any) => {
        this.router.navigate(['admin/dashboard']);
      })
      .catch(() => {
        Swal.fire({
          title: 'Algo falló',
          text: 'Ocurrió un error con el inicio de sesión',
          icon: 'error',
        });
      });
  }
}
