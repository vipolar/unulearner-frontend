import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

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
	selector: 'storage-create-response',
	templateUrl: './create-response.component.html',
	styleUrls: ['./create-response.component.scss'],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
	],
	standalone: true
})
export class CreateResponseComponent implements OnInit {
	public formattedDateCreated: string | null = null;

	public resultNode: StorageNode = this.data.response.response;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<CreateResponseComponent>
	) { }

	ngOnInit() {
		const dateCreated = new Date(this.resultNode.created);
		this.formattedDateCreated = new DatePipe('en-US').transform(dateCreated, 'yyyy-MM-dd HH:mm:ss');
	}
}
