import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
	selector: 'storage-execute',
	templateUrl: './execute.component.html',
	styleUrls: ['./execute.component.scss'],
	imports: [
		CommonModule,
		MatDialogModule,
		//MatSelectModule,
		//MatButtonModule,
		//MatTabsModule
	],
	standalone: true
})
export class ExecuteComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<ExecuteComponent>,
		private storageService: StorageService
	) { }

	ngOnInit() {
		console.log(this.data);
		/*
		const targetDateCreated = new Date(this.targetNode.created);
		const targetDateUpdated = new Date(this.targetNode.updated);

		this.formattedTargetDateCreated = new DatePipe('en-US').transform(targetDateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedTargetDateUpdated = new DatePipe('en-US').transform(targetDateUpdated, 'yyyy-MM-dd HH:mm:ss');

		const destinationDateCreated = new Date(this.destinationNode.created);
		const destinationDateUpdated = new Date(this.destinationNode.updated);

		this.formattedDestinationDateCreated = new DatePipe('en-US').transform(destinationDateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedDestinationDateUpdated = new DatePipe('en-US').transform(destinationDateUpdated, 'yyyy-MM-dd HH:mm:ss');
		*/
	}
}
