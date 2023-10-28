import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-form-user-sign-up',
    templateUrl: './form-user-sign-up.component.html',
    styleUrls: ['./form-user-sign-up.component.css']
})
export class FormUserSignUpComponent implements OnInit {
    form!: FormGroup

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            username: ["", [Validators.required, Validators.minLength(6)]],
            passwordinitial: ["", [Validators.required, Validators.minLength(8)]],
            passwordconfirm: ["", [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        console.log("reactive form submitted");
        console.log(this.form.value);
    }
}
