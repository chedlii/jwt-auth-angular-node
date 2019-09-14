import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string
  email: string
  password: string
  password2: string

  errors = {}



  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit() {


  }

  onSubmit() {

    const { name, email, password, password2 } = this

    const newUser = {
      name,
      email,
      password,
      password2


    }

    this.authService.register(newUser).subscribe(

      registeredUser => {

        console.log(registeredUser)
        this.router.navigate(['login'])

      },
      err => {
        console.log(err.error)


        this.errors = err.error;

      })




  }

}
