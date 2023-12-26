import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageNode } from '@app/app.types';

import { MatButtonModule } from '@angular/material/button';

import {
	//MatDialog,
	//MatDialogRef,
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

export class RemoveComponent {
	public targetNode: StorageNode = this.data.targetNode;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		//public dialogRef: MatDialogRef<RemoveComponent>
	) { }
}
