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
	selector: 'storage-details-edit',
	templateUrl: './details-edit.component.html',
	styleUrls: ['./details-edit.component.scss'],
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
export class DetailsEditComponent implements OnInit {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscriptionCancellable: boolean = false;
	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public formattedDateCreated: string | null = null;
	public formattedDateUpdated: string | null = null;

	public targetNode: StorageNode = this.data.targetNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DetailsEditComponent>,
		private storageService: StorageService
	) {	}

	public editNodeForm = new FormGroup({
		name: new FormControl(this.targetNode.name, [Validators.required, Validators.pattern("^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$")]),
		description: new FormControl(this.targetNode.description, Validators.required)
	});

	public editNode() {
		const formData = new FormData();
		const formValues = this.editNodeForm.value;

		if (formValues.description && formValues.name) {
			formData.append('description', formValues.description);
			formData.append('name', formValues.name);
		}

		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		const storageServiceObservable = this.targetNode.isDirectory ? this.storageService.editDirectoryById(this.targetNode.id, formData) : this.storageService.editFileById(this.targetNode.id, formData);
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

		this.responseEmitter.emit({ message: `${this.targetNode.isDirectory ? 'Directory' : 'File'} edit was cancelled by user` });
		this.dialogRef.close('cancelled');
	}

	ngOnInit() {
		const dateCreated = new Date(this.targetNode.created);
		const dateUpdated = new Date(this.targetNode.updated);

		this.formattedDateCreated = new DatePipe('en-US').transform(dateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedDateUpdated = new DatePipe('en-US').transform(dateUpdated, 'yyyy-MM-dd HH:mm:ss');
	}
}
