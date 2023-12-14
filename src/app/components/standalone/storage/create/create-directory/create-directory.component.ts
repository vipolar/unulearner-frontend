import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { StorageService } from '@services/rest/storage/storage.service';
import { StorageNode } from '@app/app.types';

import { HttpResponse } from '@angular/common/http';

import {
	MatDialogRef,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogModule,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

interface NewDirectoryFormTypes {
	parent: number;
	directory: string;
	description: string;
}

@Component({
	selector: 'storage-create-directory',
	templateUrl: './create-directory.component.html',
  	styleUrls: ['./create-directory.component.scss'],
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule
	],
	standalone: true
})
export class CreateDirectoryComponent {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();
	
	public formSubmissionSubscriptionCancellable: boolean = false;
	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public fileUploadProgress: number | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: StorageNode,
		public dialogRef: MatDialogRef<CreateDirectoryComponent>,
		private storageService: StorageService
	) { }

	public newDirectoryForm = new FormGroup({
		parent: new FormControl(this.data.id, Validators.required),
		description: new FormControl(null, Validators.required),
		directory: new FormControl(null, Validators.required),
	});

	public addDirectory() {
		const formData = new FormData();
		const formValues = this.newDirectoryForm.value;

		Object.keys(formValues).forEach((key) => {
			const value = formValues[key as keyof NewDirectoryFormTypes];
			if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		});

		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		this.storageService.saveDirectory(formData)
			.subscribe({
				next: (response: HttpResponse<any>) => {
					this.formSubmissionSubscriptionCancellable = false;
					this.formSubmissionResponse = response;

					this.responseEmitter.emit({ response });
					this.dialogRef.close('response');
				},
				error: (error: any) => {
					this.formSubmissionSubscriptionCancellable = false;
					this.formSubmissionResponse = error;

					this.responseEmitter.emit({ error });
					this.dialogRef.close('error');
				}
			});
	}

	public cancelSubscription(): void {
		this.formSubmissionSubscription.unsubscribe();
		this.formSubmissionSubscriptionCancellable = false;
		this.formSubmissionSubscription = undefined;

		this.responseEmitter.emit({ message: 'Directory creation was cancelled by user' });
		this.dialogRef.close('cancelled');
	}
}
