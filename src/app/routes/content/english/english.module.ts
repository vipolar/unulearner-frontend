import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
import { ImportComponent } from './import/import.component';
import { UpdateComponent } from './update/update.component';
import { EnglishComponent } from './english.component';

import { StorageModule } from '@components/standalone/storage/storage.module';

const routes: Routes = [
	{ path: 'create', component: CreateComponent },
	{ path: 'import', component: ImportComponent },
	{ path: 'update', component: UpdateComponent },
	{ path: '', component: EnglishComponent }
];

@NgModule({
	declarations: [
		EnglishComponent,
		CreateComponent,
		ImportComponent,
		UpdateComponent
	],
	imports: [
		StorageModule,
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
