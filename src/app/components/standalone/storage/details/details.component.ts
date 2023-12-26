import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
	public targetNode: StorageNode = this.data.targetNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DetailsComponent>,
		private storageService: StorageService
	) { }

	public initiateDownload() {
		// Create an anchor element
		const downloadLink = document.createElement('a');
		downloadLink.href = this.storageService.getFileLinkById(this.data.id);
		downloadLink.download = this.data.name;

		// Append the anchor to the body
		document.body.appendChild(downloadLink);
		downloadLink.click();

		// Remove the anchor from the body
		document.body.removeChild(downloadLink);

		// Close the dialog
		this.dialogRef.close('error');
	}
}
