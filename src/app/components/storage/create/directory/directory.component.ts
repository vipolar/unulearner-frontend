import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'storage-create-directory',
	templateUrl: './directory.component.html',
	styleUrls: ['./directory.component.scss']
})
export class CreateDirectoryComponent implements OnDestroy {
	@Output() formDataChange = new EventEmitter<FormGroup>();

	private formSubscription: Subscription;
	public newDirectoryForm: FormGroup;

	public directoryCreationProgress: boolean = false;

	constructor() {
		this.newDirectoryForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			description: new FormControl(null, Validators.required),
		});

		// Subscribe to form value changes
		this.formSubscription = this.newDirectoryForm.valueChanges.subscribe(value => {
			this.formDataChange.emit(this.newDirectoryForm);
		});
	}

	ngOnDestroy(): void {
		// Unsubscribe from the form value changes subscription to prevent memory leaks
		if (this.formSubscription) {
			this.formSubscription.unsubscribe();
		}
	}

	addDirectoryDull() {
		return;
	}
}
