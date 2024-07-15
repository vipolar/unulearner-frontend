import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'storage-create-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class CreateFileComponent implements OnDestroy {
	@Output() formDataChange = new EventEmitter<FormGroup>();

	private formSubscription: Subscription;
	public newFileForm: FormGroup;

	constructor() {
		this.newFileForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			content: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
		});

		// Subscribe to form value changes
		this.formSubscription = this.newFileForm.valueChanges.subscribe(value => {
			this.formDataChange.emit(this.newFileForm);
		});
	}

	ngOnDestroy(): void {
		// Unsubscribe from the form value changes subscription to prevent memory leaks
		if (this.formSubscription) {
			this.formSubscription.unsubscribe();
		}
	}

	setFileName(name: string) {
		this.newFileForm.get('name')?.setValue(name);
	}

	addFileDull() {
		return;
	}
}
