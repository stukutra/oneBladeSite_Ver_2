import { AuthService } from 'src/app/service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login(this.email, this.password).subscribe(response => {
            if (response.token) {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
            } else {
                alert('Login failed');
            }
        });
    }
}
