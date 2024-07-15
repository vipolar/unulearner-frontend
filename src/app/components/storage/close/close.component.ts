import { Component, Inject } from '@angular/core';

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
	selector: 'storage-close',
	templateUrl: './close.component.html',
	styleUrls: ['./close.component.scss']
})
export class CloseComponent {
	public errorMessage: string = this.data.errorMessage;
	public errorStatus: number = this.data.errorStatus;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<CloseComponent>
	) { }
}
