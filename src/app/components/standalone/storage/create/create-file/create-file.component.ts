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

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, filter, map, tap } from 'rxjs';

import { UploadComponent } from './upload/upload.component';

import {
	//MatDialog,
	MatDialogRef,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogModule,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

interface NewFileFormTypes {
	content: File;
	parent: number;
	description: string;
}

@Component({
	selector: 'storage-create-file',
	templateUrl: './create-file.component.html',
	styleUrls: ['./create-file.component.scss'],
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		//MatIconModule,
		UploadComponent
	],
	standalone: true
})
export class CreateFileComponent {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscriptionCancellable: boolean = false;
	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public fileUploadProgress: number | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: StorageNode,
		public dialogRef: MatDialogRef<CreateFileComponent>,
		private storageService: StorageService
	) { }

	public newFileForm = new FormGroup({
		parent: new FormControl(this.data.id, Validators.required),
		description: new FormControl(null, Validators.required),
		content: new FormControl(null, Validators.required),
	});

	public addFile(): void {
		const formData = new FormData();
		const formValues = this.newFileForm.value;

		Object.entries(formValues).forEach(([key, value]) => {
			const typedValue = value as NewFileFormTypes[keyof NewFileFormTypes];

			if (typedValue !== undefined && typedValue !== null) {
				if (typedValue instanceof File) {
					formData.append(key, typedValue, typedValue.name);
				} else {
					formData.append(key, typedValue.toString());
				}
			}
		});

		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		this.formSubmissionSubscription = this.storageService.saveFile(formData)
			.pipe(
				tap(event => {
					if (event.type === HttpEventType.UploadProgress && event.total) {
						this.fileUploadProgress = Math.round(100 * (event.loaded / event.total));
					}
				}),
				filter(event => event instanceof HttpResponse), //filter(event => event.type === HttpEventType.Response),
				map((event: any) => event.body), //map(event => event as HttpResponse<any>),
				catchError(error => {
					throw error;
				})
			)
			.subscribe({
				next: (response: HttpResponse<any>) => {
					this.formSubmissionSubscriptionCancellable = false;
					this.formSubmissionResponse = response;
					this.fileUploadProgress = null;

					this.responseEmitter.emit({ response });
					this.dialogRef.close('response');
				},
				error: (error: any) => {
					this.formSubmissionSubscriptionCancellable = false;
					this.formSubmissionResponse = error;
					this.fileUploadProgress = null;

					this.responseEmitter.emit({ error });
					this.dialogRef.close('error');
				}
			});
	}

	public cancelSubscription(): void {
		this.formSubmissionSubscription.unsubscribe();
		this.formSubmissionSubscriptionCancellable = false;
		this.formSubmissionSubscription = undefined;

		this.responseEmitter.emit({ message: 'File upload was cancelled by user' });
		this.dialogRef.close('cancelled');
	}
}
