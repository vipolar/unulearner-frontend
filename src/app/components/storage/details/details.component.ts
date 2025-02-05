import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { StorageService } from '@services/rest/storage/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { StorageNode } from '@app/app.types';

import {
	MatDialogRef,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
	selector: 'storage-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public targetNode: StorageNode = this.data.targetNode;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DetailsComponent>,
		private storageService: StorageService
	) {	}

	public editNodeForm = new FormGroup({
		description: new FormControl(this.data.targetNode.description, Validators.required),
		name: new FormControl(this.data.targetNode.name, Validators.required)
	});

	public editNode() {
		return;

		/*
		const formData = new FormData();
		const formValues = this.editNodeForm.value;

		if (formValues.description && formValues.name) {
			formData.append('description', formValues.description);
			formData.append('name', formValues.name);
		}
		//TODO: update the node itself and just send it!

		const storageServiceObservable = this.data.targetNode.children != null ? this.storageService.updateDirectoryById(formData) : this.storageService.updateFileById(formData);
		this.formSubmissionSubscription = storageServiceObservable
			.subscribe({
				next: (response: HttpResponse<any>) => {
					this.formSubmissionResponse = response;

					this.responseEmitter.emit({ response });
					this.dialogRef.close('success');
				},
				error: (error: any) => {
					this.formSubmissionResponse = error;

					if (error.status == 403 || error.status == 401) {
						this.responseEmitter.emit({
							error: {
								errorMessage: "Access denied!",
								errorStatus: error.status
							}
						});

						this.dialogRef.close('failure');
						return;
					}

					this.responseEmitter.emit({ error });
					this.dialogRef.close('failure');
				}
			});
		*/
	}
}
