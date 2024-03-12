import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

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
	selector: 'storage-transfer',
	templateUrl: './transfer.component.html',
	styleUrls: ['./transfer.component.scss'],
	imports: [
		CommonModule,
		MatDialogModule,
		MatSelectModule,
		MatButtonModule,
		MatTabsModule
	],
	standalone: true
})

export class TransferComponent implements OnInit {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscriptionCancellable: boolean = false;
	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public formattedTargetDateCreated: string | null = null;
	public formattedTargetDateUpdated: string | null = null;

	public formattedDestinationDateCreated: string | null = null;
	public formattedDestinationDateUpdated: string | null = null;

	public inCaseOfConflict: string = 'ignore';
	public targetNode: StorageNode = this.data.targetNode;
	public destinationNode: StorageNode = this.data.destinationNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<TransferComponent>,
		private storageService: StorageService
	) { }

	public copyNode() {
		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		const storageServiceObservable = this.targetNode.children != null ? this.storageService.copyDirectoryByIdToById(this.targetNode.id, this.destinationNode.id, this.inCaseOfConflict) : this.storageService.copyFileByIdToById(this.targetNode.id, this.destinationNode.id, this.inCaseOfConflict);
		this.formSubmissionSubscription = storageServiceObservable
			.subscribe({
				next: (response: HttpResponse<any>) => {
					console.log(response);
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

	public moveNode() {
		// Delay the activation of the Cancel button (UX things...)
		setTimeout(() => { this.formSubmissionSubscriptionCancellable = true }, 500);

		const storageServiceObservable = this.targetNode.children != null ? this.storageService.moveDirectoryByIdToById(this.targetNode.id, this.destinationNode.id, this.inCaseOfConflict) : this.storageService.moveFileByIdToById(this.targetNode.id, this.destinationNode.id, this.inCaseOfConflict);
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

		this.responseEmitter.emit({ message: `${this.targetNode.children != null ? 'Directory' : 'File'} transfer was cancelled by user` });
		this.dialogRef.close('cancelled');
	}

	ngOnInit() {
		const targetDateCreated = new Date(this.targetNode.created);
		const targetDateUpdated = new Date(this.targetNode.updated);

		this.formattedTargetDateCreated = new DatePipe('en-US').transform(targetDateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedTargetDateUpdated = new DatePipe('en-US').transform(targetDateUpdated, 'yyyy-MM-dd HH:mm:ss');

		const destinationDateCreated = new Date(this.destinationNode.created);
		const destinationDateUpdated = new Date(this.destinationNode.updated);

		this.formattedDestinationDateCreated = new DatePipe('en-US').transform(destinationDateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedDestinationDateUpdated = new DatePipe('en-US').transform(destinationDateUpdated, 'yyyy-MM-dd HH:mm:ss');
	}
}
