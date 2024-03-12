import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

import { StorageService } from '@services/rest/storage/storage.service';

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
		MatButtonModule,
		MatProgressBarModule
	],
	standalone: true
})

export class RemoveComponent implements OnInit {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();

	public formSubmissionSubscriptionCancelButtonEnabled: boolean = false;
	public formSubmissionSubscriptionCancellable: boolean = false;
	public formSubmissionSubscription: any = undefined;

	public formattedDateCreated: string | null = null;
	public formattedDateUpdated: string | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<RemoveComponent>,
		private storageService: StorageService
	) { }

	ngOnInit() {
		const dateCreated = new Date(this.data.targetNode.created);
		const dateUpdated = new Date(this.data.targetNode.updated);

		this.formattedDateCreated = new DatePipe('en-US').transform(dateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedDateUpdated = new DatePipe('en-US').transform(dateUpdated, 'yyyy-MM-dd HH:mm:ss');
	}

	public confirmNodeRemoval() {
		let storageServiceObservable: Observable<any>;
		this.formSubmissionSubscriptionCancellable = true;

		/* Delay activation of the Cancel button (UX things...) */
		setTimeout(() => { this.formSubmissionSubscriptionCancelButtonEnabled = true }, 500);

		if (this.data.targetNode.children != null) {
			storageServiceObservable = this.storageService.deleteDirectoryById(this.data.targetNode.id);
		} else {
			storageServiceObservable = this.storageService.deleteFileById(this.data.targetNode.id);
		}

		this.formSubmissionSubscription = storageServiceObservable.subscribe({
			next: (response: HttpResponse<any>) => {
				console.log(response)
				this.responseEmitter.emit({response});
				this.dialogRef.close('success');
			},
			error: (error: HttpErrorResponse) => {
				console.log(error)
				this.responseEmitter.emit({
					error: error
				});

				if (error.status == 409) {
					this.dialogRef.close('conflict');
				}
	
				if (error.status == 403 || error.status == 401) {
					this.dialogRef.close('denied');
				}
	
				this.dialogRef.close('failure');
			}
		});
	}

	public cancelSubscription(): void {
		this.formSubmissionSubscription.unsubscribe();
		this.formSubmissionSubscription = undefined;

		this.responseEmitter.emit({
			message: `${this.data.targetNode.children != null ? 'Directory' : 'File'} removal cancelled by user!`,
		});

		this.dialogRef.close('cancel');
	}
}
