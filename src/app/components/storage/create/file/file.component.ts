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
			name: new FormControl("", [Validators.required]),
			file: new FormControl(null, Validators.required)
		});

		this.formSubscription = this.newFileForm.valueChanges.subscribe(value => {
			this.formDataChange.emit(this.newFileForm);
		});
	}

	ngOnDestroy(): void {
		if (this.formSubscription) {
			this.formSubscription.unsubscribe();
		}
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.newFileForm.get('name')?.setValue(input.files[0].name);
			this.newFileForm.get('file')?.setValue(input.files[0]);
		}
	}

	addFileDull() {
		return;
	}
}
