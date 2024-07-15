import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StorageNodeComponent } from '@components/standalone/storage-node/storage-node.component';

// Angular material modules
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

// The storage tree and its CRUD
import { StorageComponent } from './storage.component';
import { CloseComponent } from './close/close.component';
import { ExecuteComponent } from './execute/execute.component';
import { TransferComponent } from './transfer/transfer.component';
import { DetailsComponent } from './details/details.component';
import { RemoveComponent } from './remove/remove.component';
import { CreateComponent } from './create/create.component';

import { CreateFileComponent } from './create/file/file.component';
import { UploadComponent } from './create/file/upload/upload.component';
import { CreateDirectoryComponent } from './create/directory/directory.component';

@NgModule({
	declarations: [
		StorageComponent,
		ExecuteComponent,
		TransferComponent,
		DetailsComponent,
		RemoveComponent,
		CreateComponent,
		CloseComponent,
		CreateDirectoryComponent,
		CreateFileComponent,
		UploadComponent,
	],
	imports: [
		FormsModule,
		CommonModule,
		DragDropModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatExpansionModule,
		MatStepperModule,
		MatTooltipModule,
		MatSelectModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		MatMenuModule,
		MatTabsModule,
		MatTreeModule,
		MatIconModule,
		StorageNodeComponent
	],
	exports: [
		StorageComponent
	]
})
export class StorageModule { }
