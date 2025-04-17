import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/service/User.service';

@Component({
  selector: 'app-registrationFormUser',
  templateUrl: './registrationFormUser.component.html',
  styleUrls: ['./registrationFormUser.component.scss']
})
export class RegistrationFormUserComponent implements OnInit {
  user = {
    nome: '',
    cognome: '',
    email: '',
    cellulare: '',
    password: ''
  };
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.registerUser(this.user).subscribe(response => {
      console.log('Registrazione avvenuta con successo', response);
    }, error => {
      console.error('Errore nella registrazione', error);
    });
  }

}
