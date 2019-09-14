import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service'
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router'

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent implements OnInit {

  test: string = ""

  constructor(private testServ: TestService, private router: Router) { }

  ngOnInit() {

    this.testServ.test().subscribe(data => {

      console.log(data)
      this.test = data.msg
    },
      err => {

        console.log(err)

        //error handling
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {

            this.router.navigate(['/login'])


          }

        }



      })
  }

}
