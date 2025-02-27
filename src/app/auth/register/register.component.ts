import { AuthService } from 'src/app/service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';

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
        password: '',
        confirmPassword: ''
    };
    captchaResponse: string = '';
    passwordComplexityMessage: string = '';
    passwordHasUppercase: boolean = false;
    passwordHasLowercase: boolean = false;
    passwordHasNumber: boolean = false;
    passwordHasSpecialChar: boolean = false;
    passwordHasMinLength: boolean = false;
    passwordFocused: boolean = false;

    constructor(private authService: AuthService, private router: Router, private reCaptchaV3Service: ReCaptchaV3Service) { }

    handleSuccess(token: any) {
        this.captchaResponse = token as string;
    }

    checkPasswordComplexity() {
        const password = this.user.password;
        this.passwordHasUppercase = /[A-Z]/.test(password);
        this.passwordHasLowercase = /[a-z]/.test(password);
        this.passwordHasNumber = /[0-9]/.test(password);
        this.passwordHasSpecialChar = /[\W_]/.test(password);
        this.passwordHasMinLength = /.{8,}/.test(password);

        const complexityRules = [
            { regex: /[A-Z]/, message: 'At least one uppercase letter' },
            { regex: /[a-z]/, message: 'At least one lowercase letter' },
            { regex: /[0-9]/, message: 'At least one number' },
            { regex: /[\W_]/, message: 'At least one special character' },
            { regex: /.{8,}/, message: 'At least 8 characters long' }
        ];

        const failedRules = complexityRules.filter(rule => !rule.regex.test(password));
        this.passwordComplexityMessage = failedRules.length === 0 ? 'Password is strong' : 'Password must contain: ' + failedRules.map(rule => rule.message).join(', ');
    }

    register() {
        if (this.user.password !== this.user.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        this.reCaptchaV3Service.execute('register', 'action_name', (token: string) => {
            this.handleSuccess(token);
            this.authService.register({ ...this.user, captchaResponse: this.captchaResponse }).subscribe(response => {
                if (response.success) {
                    this.router.navigate(['/login']);
                } else {
                    alert('Registration failed');
                }
            });
        });
    }
}
