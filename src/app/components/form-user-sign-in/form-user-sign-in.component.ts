import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-form-user-sign-in',
    templateUrl: './form-user-sign-in.component.html',
    styleUrls: ['./form-user-sign-in.component.css']
})
export class FormUserSignInComponent implements OnInit {
    form!: FormGroup

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        console.log("reactive form submitted");
        console.log(this.form.value);
    }
}