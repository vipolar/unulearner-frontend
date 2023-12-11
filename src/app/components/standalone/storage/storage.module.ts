import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material modules
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

// The tree and its CRUD
import { TreeComponent } from './tree/tree.component';
import { AddComponent } from './add/add.component';
import { GetComponent } from './get/get.component';
import { ModifyComponent } from './modify/modify.component';
import { RemoveComponent } from './remove/remove.component';

@NgModule({
	declarations: [
		StorageComponent,
		TreeComponent,
		AddComponent,
		GetComponent,
		ModifyComponent, 
		RemoveComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatStepperModule,
		MatButtonModule,
		MatInputModule,
		MatTreeModule,
		MatIconModule,
	],
	exports: [StorageComponent]
})
export class StorageModule { }
