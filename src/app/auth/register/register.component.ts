import { AuthService } from 'src/app/service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    user: any = {
        nome: '',
        cognome: '',
        email: '',
        cellulare: '',
        password: ''
    };

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        this.authService.register(this.user).subscribe(response => {
            if (response.success) {
                this.router.navigate(['/login']);
            } else {
                alert('Registration failed');
            }
        });
    }
}
