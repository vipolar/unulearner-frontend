import { StorageService } from '@services/rest/storage/storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { delay, expand, takeWhile } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

import { StorageTask } from '@app/app.types';


import {
	MatDialogRef,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
	selector: 'storage-execute',
	templateUrl: './execute.component.html',
	styleUrls: ['./execute.component.scss']
})
export class ExecuteComponent implements OnInit {
	public storageTask: StorageTask = this.data.body;
	public storageTaskLog: String[] = [this.storageTask.action.message];
	public storageTaskHeader: String | null = this.storageTask.action.actionHeader;

	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public cancelTaskExecution: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<ExecuteComponent>,
		private storageService: StorageService
	) { }

	optionsArray: Array<{ key: string; displayText: string; parameters: Array<{ key: string; value: string }> }> = [];

	ngOnInit() {
		this.executeStorageTask();
	}

	private executeStorageTask() {
		this.storageService.executeTaskById(this.storageTask.taskID).pipe(
			expand((response: HttpResponse<any>) => {
				this.formSubmissionResponse = response;
				this.storageTask = response.body as StorageTask;
				this.storageTaskLog.push(this.storageTask.action.message);

				if (this.storageTask.options && this.storageTask.options != null) {
					console.log(this.storageTask.options);
				}

				if (this.storageTask.taskState === 'executing') {
					return this.storageService.executeTaskById(this.storageTask.taskID).pipe(delay(Math.floor(Math.random() * (650 - 250 + 1)) + 250));
				} else if (this.cancelTaskExecution === true) {
					return this.storageService.cancelTaskById(this.storageTask.taskID);
				} else {
					return EMPTY;
				}
			}),
			takeWhile((response: HttpResponse<any>) => this.storageTask.taskState === 'executing', true)
		).subscribe({
			next: (response: HttpResponse<any>) => {
				this.formSubmissionResponse = response;
			},
			error: (error: any) => {
				this.formSubmissionResponse = error;
			}
		});
	}
}
