import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf, StorageNode } from '@app/app.types';
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
		this.newDirectoryForm = new FormGroup<ControlsOf<StorageNode>>({
			id: new FormControl(null, {
				//validators: [Validators.required],
				nonNullable: false,
				updateOn: 'change'
			}),
			url: new FormControl("asd5", {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			name: new FormControl("asd6", {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			user: new FormControl("123e4567-e89b-42d3-a456-556642440000", {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			group: new FormControl("123e4567-e89b-42d3-a456-556642440000", {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			created: new FormControl(null, {
				//validators: [Validators.required],
				nonNullable: false,
				updateOn: 'change'
			}),
			updated: new FormControl(null, {
				//validators: [Validators.required],
				nonNullable: false,
				updateOn: 'change'
			}),
			description: new FormControl("asd7", {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			permissions: new FormControl(777, {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			isConfirmed: new FormControl(false, {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			isAccessible: new FormControl(false, {
				validators: [Validators.required],
				nonNullable: true,
				updateOn: 'change'
			}),
			children: new FormControl(null, {
				//validators: [Validators.required],
				nonNullable: false,
				updateOn: 'change'
			})
		});

		// Subscribe to form value changes
		this.formSubscription = this.newDirectoryForm.valueChanges.subscribe(value => {
			this.formDataChange.emit(this.newDirectoryForm);

			Object.keys(this.newDirectoryForm.controls).forEach(key => {
				const controlErrors = this.newDirectoryForm.get(key)?.errors;
				if (controlErrors) {
					console.log(`Errors in ${key}:`, controlErrors);
				}
			});
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
