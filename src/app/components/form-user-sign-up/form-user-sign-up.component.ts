import { Component, OnInit } from '@angular/core';
import { RestAPIService } from '../../services/rest-api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-form-user-sign-up',
    templateUrl: './form-user-sign-up.component.html',
    styleUrls: ['./form-user-sign-up.component.css']
})
export class FormUserSignUpComponent implements OnInit {
    form!: FormGroup

    constructor(private fb: FormBuilder, private service: RestAPIService) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            username: ["", [Validators.required, Validators.minLength(6)]],
            password: ["", [Validators.required, Validators.minLength(8)]],
            passwordconfirm: ["", [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        console.log("reactive form submitted");

        let userCredentials = {
            email: this.form.value.email,
            username: this.form.value.username,
            password: this.form.value.password
        };

        console.log(userCredentials);
        this.service.postUserRegistrationForm(userCredentials).subscribe({
            error: (err) => { console.error(err) },
            complete: () => { console.log(userCredentials) }
        });
    }
}
