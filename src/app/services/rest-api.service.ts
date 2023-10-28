import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RestAPIService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    postUserRegistrationForm(userCredentials: any) {
        let url = "http://backend.xloodtravel-development.website/users/";
        return this.http.post(url, userCredentials, this.httpOptions);
    };
};
