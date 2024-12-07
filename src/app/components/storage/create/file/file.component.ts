import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf, StorageNode } from '@app/app.types';
import { Subscription } from 'rxjs';

@Component({
	selector: 'storage-create-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class CreateFileComponent implements OnDestroy {
	@Output() formDataChange = new EventEmitter<FormGroup>();
	@Output() fileSelected = new EventEmitter<File>();

	private formSubscription: Subscription;
	public newFile: File | null = null;
	public newFileForm: FormGroup;

	constructor() {
		this.newFileForm = new FormGroup<ControlsOf<StorageNode>>({
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
		this.formSubscription = this.newFileForm.valueChanges.subscribe(value => {
			this.formDataChange.emit(this.newFileForm);

			Object.keys(this.newFileForm.controls).forEach(key => {
				const controlErrors = this.newFileForm.get(key)?.errors;
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

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.newFile = input.files[0];
			
			// Optionally, set the file name to the form control
			this.newFileForm.get('name')?.setValue(this.newFile.name);
			this.fileSelected.emit(this.newFile);
		}
	}

	addFileDull() {
		return;
	}
}
