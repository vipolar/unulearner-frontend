import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, filter, map, tap } from 'rxjs';

import { StorageService } from '@services/rest/storage/storage.service';
import { StorageNode } from '@app/app.types';

import { UploadComponent } from './upload/upload.component';

import {
	MatDialogRef,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogModule,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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
		MatIconModule,
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

	public destinationNode: StorageNode = this.data.destinationNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<CreateFileComponent>,
		private storageService: StorageService
	) {	}

	public newFileForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$")]),
		parent: new FormControl(this.destinationNode.id, Validators.required),
		description: new FormControl(null, Validators.required),
		content: new FormControl(null, Validators.required),
	});

	public addFile(): void {
		const formData = new FormData();
		const formValues = this.newFileForm.value;

		if (formValues.content && formValues.description && formValues.parent && formValues.name) {
			formData.append('content', formValues.content, formValues.name);
			formData.append('parent', formValues.parent.toString());
			formData.append('description', formValues.description);
		}

		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		const storageServiceObservable = this.storageService.saveFile(formData)
		this.formSubmissionSubscription = storageServiceObservable
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
					this.dialogRef.close('success');
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

	public setFileName(name: string) {
		this.newFileForm.get('name')?.setValue(name);
	}

	public cancelSubscription(): void {
		this.formSubmissionSubscription.unsubscribe();
		this.formSubmissionSubscriptionCancellable = false;
		this.formSubmissionSubscription = undefined;

		this.responseEmitter.emit({ message: 'File upload was cancelled by user' });
		this.dialogRef.close('cancelled');
	}
}
