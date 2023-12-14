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
	selector: 'storage-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
	],
	standalone: true
})
export class CreateComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: StorageNode,
		public dialogRef: MatDialogRef<CreateComponent>,
		private storageService: StorageService
	) { }
}
