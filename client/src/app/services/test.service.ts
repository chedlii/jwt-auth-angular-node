import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private testUrl = "http://localhost:3000/test"

  constructor(private http: HttpClient) { }



  test(): Observable<any> {

    return this.http.get<any>(this.testUrl)

  }
}


