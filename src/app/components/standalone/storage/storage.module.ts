import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

// Angular material modules
//import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
//import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

// The storage tree and its CRUD
import { StorageComponent } from './storage.component';
//import { ExecuteComponent } from './execute/execute.component';


@NgModule({
	declarations: [
		StorageComponent,
	],
	imports: [
		CommonModule,
		DragDropModule,
		//MatProgressBarModule,
		//MatFormFieldModule,
		//MatStepperModule,
		MatTooltipModule,
		MatDialogModule,
		MatButtonModule,
		//MatInputModule,
		MatMenuModule,
		MatTreeModule,
		MatIconModule,
	],
	exports: [StorageComponent]
})
export class StorageModule { }
