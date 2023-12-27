import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

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
	selector: 'storage-remove',
	templateUrl: './remove.component.html',
	styleUrls: ['./remove.component.scss'],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule
	],
	standalone: true
})

export class RemoveComponent implements OnInit {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscriptionCancellable: boolean = false;
	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public formattedDateCreated: string | null = null;
	public formattedDateUpdated: string | null = null;
	
	public targetNode: StorageNode = this.data.targetNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<RemoveComponent>,
		private storageService: StorageService
	) { }

	public removeNode() {
		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		const storageServiceObservable = this.targetNode.isDirectory ? this.storageService.removeDirectoryById(this.targetNode.id) : this.storageService.removeFileById(this.targetNode.id);
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

		this.responseEmitter.emit({ message: `${this.targetNode.isDirectory ? 'Directory' : 'File'} removal was cancelled by user` });
		this.dialogRef.close('cancelled');
	}

	ngOnInit() {
		const dateCreated = new Date(this.targetNode.created);
		const dateUpdated = new Date(this.targetNode.updated);

		this.formattedDateCreated = new DatePipe('en-US').transform(dateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedDateUpdated = new DatePipe('en-US').transform(dateUpdated, 'yyyy-MM-dd HH:mm:ss');
	}
}
