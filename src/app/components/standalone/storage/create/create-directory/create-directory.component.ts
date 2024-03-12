import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { HttpResponse } from '@angular/common/http';

import { StorageService } from '@services/rest/storage/storage.service';
import { StorageNode } from '@app/app.types';

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

	public destinationNode: StorageNode = this.data.destinationNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<CreateDirectoryComponent>,
		private storageService: StorageService
	) {	}

	public newDirectoryForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		description: new FormControl(null, Validators.required),
	});

	public addDirectory() {
		const formData = new FormData();
		const formValues = this.newDirectoryForm.value;

		if (formValues.name && formValues.description) {
			formData.append('description', formValues.description);
			formData.append('directory', formValues.name);
		}

		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		const storageServiceObservable = this.storageService.addDirectoryToById(formData, this.destinationNode.id)
		this.formSubmissionSubscription = storageServiceObservable
			.subscribe({
				next: (response: HttpResponse<any>) => {
					this.formSubmissionSubscriptionCancellable = false;
					this.formSubmissionResponse = response;

					this.responseEmitter.emit({ response });
					this.dialogRef.close('success');
				},
				error: (error: any) => {
					this.formSubmissionSubscriptionCancellable = false;
					this.formSubmissionResponse = error;

					if (error.status == 409) {
						this.responseEmitter.emit({ error });
						this.dialogRef.close('conflict');
					}

					if (error.status == 403 || error.status == 401) {
						this.responseEmitter.emit({ error });
						this.dialogRef.close('denied');
					}
					
					this.responseEmitter.emit({ error });
					this.dialogRef.close('failure');
				}
			});
	}

	public cancelSubscription(): void {
		this.formSubmissionSubscription.unsubscribe();
		this.formSubmissionSubscriptionCancellable = false;
		this.formSubmissionSubscription = undefined;

		this.responseEmitter.emit({ message: 'Directory creation cancelled!' });
		this.dialogRef.close('cancel');
	}
}
