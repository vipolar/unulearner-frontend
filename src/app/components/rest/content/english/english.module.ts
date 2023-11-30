import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { EnglishComponent } from './english.component';

const routes: Routes = [
	{ path: 'create', component: CreateComponent },
	{ path: 'update', component: UpdateComponent },
	{ path: '', component: EnglishComponent }
];

@NgModule({
	declarations: [
		EnglishComponent,
		CreateComponent,
		UpdateComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatListModule,
		MatCardModule,
		MatSortModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatPaginatorModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		RouterModule.forChild(routes)
	],
	providers: [],
	bootstrap: [],
	exports: [
		//EnglishComponent,
		//RouterModule
	],
})
export class EnglishModule { }
