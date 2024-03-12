import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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

@Component({
	selector: 'storage-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
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
export class DetailsComponent implements OnInit {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscriptionCancellable: boolean = false;
	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public formattedDateCreated: string | null = null;
	public formattedDateUpdated: string | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DetailsComponent>,
		private storageService: StorageService
	) {	}

	public editNodeForm = new FormGroup({
		description: new FormControl(this.data.targetNode.description, Validators.required),
		name: new FormControl(this.data.targetNode.onDiskName, Validators.required)
	});

	public editNode() {
		const formData = new FormData();
		const formValues = this.editNodeForm.value;

		if (formValues.description && formValues.name) {
			formData.append('description', formValues.description);
			formData.append('name', formValues.name);
		}

		/* Delay activation of the Cancel button (UX things...) */
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		const storageServiceObservable = this.data.targetNode.children != null ? this.storageService.updateDirectoryById(this.data.targetNode.id, formData) : this.storageService.updateFileById(this.data.targetNode.id, formData);
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

					this.responseEmitter.emit({ error });
					this.dialogRef.close('error');
				}
			});
	}

	public cancelSubscription(): void {
		this.formSubmissionSubscription.unsubscribe();
		this.formSubmissionSubscriptionCancellable = false;
		this.formSubmissionSubscription = undefined;

		this.responseEmitter.emit({
			message: `${this.data.targetNode.children != null ? 'Directory' : 'File'} edit was cancelled by user`
		});

		this.dialogRef.close('cancel');
	}

	ngOnInit() {
		const dateCreated = new Date(this.data.targetNode.created);
		const dateUpdated = new Date(this.data.targetNode.updated);

		this.formattedDateCreated = new DatePipe('en-US').transform(dateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedDateUpdated = new DatePipe('en-US').transform(dateUpdated, 'yyyy-MM-dd HH:mm:ss');
	}
}
