import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { StorageService } from '@services/rest/storage/storage.service';
import { HttpResponse } from '@angular/common/http';
import { StorageNode } from '@app/app.types';
import { Observable } from 'rxjs';

import {
	MatDialogRef,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
	selector: 'storage-remove',
	templateUrl: './remove.component.html',
	styleUrls: ['./remove.component.scss']
})

export class RemoveComponent {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public targetNode: StorageNode = this.data.targetNode;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<RemoveComponent>,
		private storageService: StorageService
	) { }

	public removeNode() {
		const storageServiceObservable = this.storageService.rm(this.data.targetNode.id);

		this.formSubmissionSubscription = storageServiceObservable.subscribe({
			next: (response: HttpResponse<any>) => {
				this.formSubmissionResponse = response;

				this.responseEmitter.emit({response});
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

				this.responseEmitter.emit({error});
				this.dialogRef.close('failure');
			}
		});
	}
}
