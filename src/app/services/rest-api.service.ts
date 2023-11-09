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
        let url = "https://backend.xloodtravel-development.website/users/list/register";
        return this.http.post(url, userCredentials, this.httpOptions);
    };
};
