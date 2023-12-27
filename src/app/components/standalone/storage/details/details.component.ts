import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

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
	selector: 'storage-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
	],
	standalone: true
})
export class DetailsComponent {
	public formattedDateCreated: string | null = null;
	public formattedDateUpdated: string | null = null;

	public targetNode: StorageNode = this.data.targetNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DetailsComponent>,
		private storageService: StorageService
	) { }

	public initiateDownload() {
		// Create an anchor element
		const downloadLink = document.createElement('a');
		downloadLink.href = this.storageService.getFileLinkById(this.targetNode.id);
		downloadLink.download = this.targetNode.name;

		// Append the anchor to the body
		document.body.appendChild(downloadLink);
		downloadLink.click();

		// Remove the anchor from the body
		document.body.removeChild(downloadLink);

		// Close the dialog
		this.dialogRef.close();
	}

	ngOnInit() {
		const dateCreated = new Date(this.targetNode.created);
		const dateUpdated = new Date(this.targetNode.updated);

		this.formattedDateCreated = new DatePipe('en-US').transform(dateCreated, 'yyyy-MM-dd HH:mm:ss');
		this.formattedDateUpdated = new DatePipe('en-US').transform(dateUpdated, 'yyyy-MM-dd HH:mm:ss');
	}
}
