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
	selector: 'storage-transfer',
	templateUrl: './transfer.component.html',
	styleUrls: ['./transfer.component.scss']
})

export class TransferComponent {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public targetNode: StorageNode = this.data.targetNode;
	public destinationNode: StorageNode = this.data.destinationNode;
	
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<TransferComponent>,
		private storageService: StorageService
	) { }

	public async copyNode() {
		if (this.targetNode.id == null || this.destinationNode.id == null) {
			return;
		}

		const storageServiceObservable = this.storageService.cp(this.targetNode.id, this.destinationNode.id, null);
		this.transferNode(storageServiceObservable);
	}

	public async moveNode() {
		if (this.targetNode.id == null || this.destinationNode.id == null) {
			return;
		}

		const storageServiceObservable = this.storageService.mv(this.targetNode.id, this.destinationNode.id, null);
		this.transferNode(storageServiceObservable);
	}

	public async linkNode() {
		if (this.targetNode.id == null || this.destinationNode.id == null) {
			return;
		}

		const storageServiceObservable = this.storageService.ln(this.targetNode.id, this.destinationNode.id, null);
		this.transferNode(storageServiceObservable);
	}

	private async transferNode(storageServiceObservable: Observable<any>) {
		this.formSubmissionSubscription = storageServiceObservable.subscribe({
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
	}
}
