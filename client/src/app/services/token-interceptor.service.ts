import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http'

import { AuthentificationService } from './authentification.service'


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthentificationService) { }


  intercept(req, next) {

    //clone the request

    let tokinazedReq = req.clone({

      setHeaders: {
        Authorization: ` ${this.authService.getToken()}`
      }


    })

    return next.handle(tokinazedReq)


  }
}
