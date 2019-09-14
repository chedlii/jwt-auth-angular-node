import { Component, OnInit, Input } from '@angular/core';

import { AuthentificationService } from '../../services/authentification.service'
import { TestService } from "../../services/test.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInfos = {}




  constructor(private authService: AuthentificationService) { }

  ngOnInit() {


    this.userInfos = this.authService.currentUser






  }

  onlogout() {

    this.authService.logout()


  }

}
