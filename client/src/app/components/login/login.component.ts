import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthentificationService } from '../../services/authentification.service'

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string

  errors = {}


  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit() {


  }

  onSubmit() {

    const { email, password } = this

    const infoUser = {

      email,
      password

    }

    this.authService.login(infoUser).pipe(first()).subscribe(loggingData => {


      this.router.navigate(['/'])


    },
      err => {
        console.log(err)
        this.errors = err.error

      }
    )



  }

}
