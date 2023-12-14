import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material modules
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

// The storage tree and its CRUD
import { StorageComponent } from './storage.component';

//import { ResponseComponent } from './create/file/response/response.component';

@NgModule({
	declarations: [
		StorageComponent
	],
	imports: [
		CommonModule,
		//MatProgressBarModule,
		//MatFormFieldModule,
		//MatStepperModule,
		MatDialogModule,
		MatButtonModule,
		//MatInputModule,
		MatTreeModule,
		MatIconModule,
	],
	exports: [StorageComponent]
})
export class StorageModule { }
