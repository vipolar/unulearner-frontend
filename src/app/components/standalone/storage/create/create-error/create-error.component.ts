import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

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
  selector: 'storage-create-error',
  templateUrl: './create-error.component.html',
  styleUrls: ['./create-error.component.scss'],
  imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
	],
  standalone: true
})
export class CreateErrorComponent {
  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<CreateErrorComponent>
	) { }
}
