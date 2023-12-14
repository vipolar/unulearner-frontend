import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: StorageNode,
		public dialogRef: MatDialogRef<DetailsComponent>
	) { }
}
