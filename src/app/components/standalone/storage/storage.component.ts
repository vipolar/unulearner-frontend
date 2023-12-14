import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';

import { InfoComponent } from './info/info.component';

import { StorageService } from '@services/rest/storage/storage.service';
import { StorageNode } from '@app/app.types';

import { CreateComponent } from './create/create.component';
import { CreateFileComponent } from './create/create-file/create-file.component';
import { CreateDirectoryComponent } from './create/create-directory/create-directory.component';
import { CreateCancelledComponent } from './create/create-cancelled/create-cancelled.component';
import { CreateResponseComponent } from './create/create-response/create-response.component';
import { CreateErrorComponent } from './create/create-error/create-error.component';


import { DownloadComponent } from './download/download.component';
import { RemoveComponent } from './remove/remove.component';

export enum DialogMode {
	USE,
	INFO,
	CREATE,
	DOWNLOAD,
	REMOVE
}

interface DialogConfig {
	[key: string]: any;
}

@Component({
	selector: 'app-storage',
	templateUrl: './storage.component.html',
	styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
	public treeControl = new NestedTreeControl<StorageNode>(node => node.childNodes);
	public dataSource = new MatTreeNestedDataSource<StorageNode>();
	public selectedNode: StorageNode | null = null;
	public dialogMode = DialogMode;

	@Output() onTreeNodeSelect = new EventEmitter<any>();

	constructor(
		private storageService: StorageService,
		private dialog: MatDialog
	) { }

	public onTreeNodeClick(node: StorageNode): void {
		if (!this.selectedNode) {
			this.selectedNode = node;
		} else {
			this.selectedNode = null;
		}
	}

	public openDialog(mode: DialogMode, node: StorageNode | null): void {
		let dialogComponent: DialogConfig | null = null;
		let dialogComponentStage: string = 'initial';

		if (!node || node.id != this.selectedNode?.id) {
			return;
		}

		switch (mode) {
			case this.dialogMode.USE:
				dialogComponent = null; // THIS WILL BE IMPORTED?
				break;
			case this.dialogMode.INFO:
				dialogComponent = {
					'initial': InfoComponent
				};
				break;
			case this.dialogMode.CREATE:
				dialogComponent = {
					'initial': CreateComponent,
					'createFile': CreateFileComponent,
					'createDirectory': CreateDirectoryComponent,
					'cancelled': CreateCancelledComponent,
					'response': CreateResponseComponent,
					'error': CreateErrorComponent
				};
				break;
			case this.dialogMode.DOWNLOAD:
				dialogComponent = {
					'initial': DownloadComponent
				};
				break;
			case this.dialogMode.REMOVE:
				dialogComponent = {
					'initial': RemoveComponent
				};
				break;
			default:
				return;
		}

		this.openDialogsRecursive(dialogComponent, dialogComponentStage, node);
	}

	private openDialogsRecursive(dialogComponent: any, dialogComponentStage: string, node: any): void {
		if (dialogComponent && dialogComponent[dialogComponentStage] && node) {
			const dialogRef = this.dialog.open(dialogComponent[dialogComponentStage], {
				enterAnimationDuration: '300ms',
				exitAnimationDuration: '150ms',
				closeOnNavigation: false,
				disableClose: true,
				data: node,
			});

			if (dialogRef.componentInstance && (dialogRef.componentInstance as any).responseEmitter) {
				(dialogRef.componentInstance as any).responseEmitter.subscribe((response: any) => {
					dialogRef.afterClosed().subscribe(result => {
						this.openDialogsRecursive(dialogComponent, result, response);
					});
				});
			} else {
				dialogRef.afterClosed().subscribe(result => {
					this.openDialogsRecursive(dialogComponent, result, node);
				});
			}
		}
	}

	ngOnInit() {
		this.storageService.getRootDirectory()
			.subscribe(response => {
				this.dataSource.data = [response];
			});
	}

	hasChild = (_: number, node: StorageNode) =>
		node.childNodes && node.childNodes.length > 0 || node.isDirectory
}
