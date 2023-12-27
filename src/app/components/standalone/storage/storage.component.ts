import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from '@services/rest/storage/storage.service';
import { StorageNode } from '@app/app.types';

import { CreateComponent } from './create/create.component';
import { CreateFileComponent } from './create/create-file/create-file.component';
import { CreateDirectoryComponent } from './create/create-directory/create-directory.component';
import { CreateCancelledComponent } from './create/create-cancelled/create-cancelled.component';
import { CreateResponseComponent } from './create/create-response/create-response.component';
import { CreateErrorComponent } from './create/create-error/create-error.component';

import { DetailsComponent } from './details/details.component';
import { DetailsEditComponent } from './details/details-edit/details-edit.component';
import { DetailsResponseComponent } from './details/details-response/details-response.component';
import { DetailsErrorComponent } from './details/details-error/details-error.component';

import { TransferComponent } from './transfer/transfer.component';
import { TransferCancelledComponent } from './transfer/transfer-cancelled/transfer-cancelled.component';
import { TransferResponseComponent } from './transfer/transfer-response/transfer-response.component';
import { TransferErrorComponent } from './transfer/transfer-error/transfer-error.component';

import { RemoveComponent } from './remove/remove.component';
import { RemoveCancelledComponent } from './remove/remove-cancelled/remove-cancelled.component';
import { RemoveResponseComponent } from './remove/remove-response/remove-response.component';
import { RemoveErrorComponent } from './remove/remove-error/remove-error.component';

export enum DialogMode {
	USE,
	CREATE,
	DETAILS,
	TRANSFER,
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
	@Output() nodeDropped = new EventEmitter<any>();

	constructor(
		private storageService: StorageService,
		private dialog: MatDialog
	) { }

	public onTreeNodeClick(node: StorageNode, event: any): void {
		if (this.selectedNode) {
			if (this.selectedNode.id != node.id) {
				this.selectedNode = node;

				if (!this.treeControl.isExpanded(node)) {
					this.treeControl.expand(node);
				}
			} else {
				this.selectedNode = null;

				if (this.treeControl.isExpanded(node)) {
					this.treeControl.collapseDescendants(node);
				}
			}
		} else {
			this.selectedNode = node;

			if (!this.treeControl.isExpanded(node)) {
				this.treeControl.expand(node);
			}
		}

		(event.target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}

	public onNodeDrag(event: CdkDragStart, node: StorageNode): void {
		const target = event.source.element.nativeElement;
		const parent = event.source.element.nativeElement.parentElement;
		const clone = event.source.element.nativeElement.cloneNode(true) as HTMLElement;

		parent!.insertBefore(clone, target.nextSibling);
		target.style.pointerEvents = 'none';
		target.style.position = 'fixed';
		target.style.zIndex = '1000';

		// Set the position of the clone to match the original node
		const rect = event.source.element.nativeElement.getBoundingClientRect();
		target.style.width = `${rect.width}px`;
		target.style.left = `${rect.left}px`;
		target.style.top = `${rect.top}px`;

		// Update the position of the clone during dragging
		const dragMoveSubscription = event.source._dragRef.moved.subscribe((dragMoveEvent) => {
			const movedRect = dragMoveEvent.pointerPosition!;
			target.style.transform = clone.style.transform;
			target.style.left = `${movedRect.x}px`;
			target.style.top = `${movedRect.y}px`;
		});

		const dragEndSubscription = event.source._dragRef.ended.subscribe((dragMoveEvent) => {
			// Get the coordinates of the drop position
			const dropX = dragMoveEvent.dropPoint.x || 0;
			const dropY = dragMoveEvent.dropPoint.y || 0;

			// Find the drop target element at the coordinates
			const dropTargetElement = document.elementFromPoint(dropX, dropY);

			if (dropTargetElement?.closest('.mat-nested-tree-node')) {
				const nodeDroppedEvent = new CustomEvent('nodeDropped', {
					bubbles: true, // Allow the event to bubble up the DOM hierarchy
					detail: { data : node }, // You can attach additional data
				});
			  
				dropTargetElement?.dispatchEvent(nodeDroppedEvent);
			}

			// Cleanup on drag end
			target.style.pointerEvents = clone.style.pointerEvents;
			target.style.transform = clone.style.transform;
			target.style.position = clone.style.position;
			target.style.display = clone.style.display;
			target.style.zIndex = clone.style.zIndex;
			target.style.width = clone.style.width;
			target.style.left = clone.style.left;
			target.style.top = clone.style.top;

			// Remove the clone from the document body
			parent!.removeChild(clone);

			// Unsubscribe to avoid memory leaks
			dragMoveSubscription.unsubscribe();
			dragEndSubscription.unsubscribe();
		});
	}

	public onNodeDrop(event: any, destinationNode: StorageNode): void {
		event.stopPropagation(); // Only the first hit is needed
		const targetNode : StorageNode = event.detail.data;

		if (targetNode == null || destinationNode == null) {
			return;
		}

		if (!destinationNode.isDirectory) {
			return;
		}

		this.openDialog(this.dialogMode.TRANSFER, targetNode, destinationNode, null);
	}

	public openDialog(mode: DialogMode, targetNode?: StorageNode | null, destinationNode?: StorageNode | null, response?: any): void {
		let dialogComponent: DialogConfig | null = null;
		let dialogComponentStage: string = 'initial';

		// Check if at least one of the nodes is present and is the same as the selected node or both of the nodes are present (no need for any to be selected) and mode is TRANSFER
		if ((!targetNode || targetNode.id != this.selectedNode?.id) && (!destinationNode || destinationNode.id != this.selectedNode?.id) && (!targetNode || !destinationNode || mode != this.dialogMode.TRANSFER)) {
			return;
		}

		switch (mode) {
			case this.dialogMode.USE:
				dialogComponent = null; // THIS WILL BE IMPORTED?
				break;
			case this.dialogMode.CREATE:
				dialogComponent = {
					'initial': CreateComponent,
					'createFile': CreateFileComponent,
					'createDirectory': CreateDirectoryComponent,
					'cancelled': CreateCancelledComponent,
					'success': CreateResponseComponent,
					'error': CreateErrorComponent
				};
				break;
			case this.dialogMode.DETAILS:
				dialogComponent = {
					'initial': DetailsComponent,
					'editNode': DetailsEditComponent,
					'success': DetailsResponseComponent,
					'error': DetailsErrorComponent
				};
				break;
			case this.dialogMode.TRANSFER:
				dialogComponent = {
					'initial': TransferComponent,
					'cancelled': TransferCancelledComponent,
					'success': TransferResponseComponent,
					'error': TransferErrorComponent
				};
				break;
			case this.dialogMode.REMOVE:
				dialogComponent = {
					'initial': RemoveComponent,
					'cancelled': RemoveCancelledComponent,
					'success': RemoveResponseComponent,
					'error': RemoveErrorComponent
				};
				break;
			default:
				return;
		}

		this.openDialogsRecursive(dialogComponent, dialogComponentStage, targetNode, destinationNode, response);
	}

	private openDialogsRecursive(dialogComponent: any, dialogComponentStage: string, targetNode?: StorageNode | null, destinationNode?: StorageNode | null, response?: any): void {
		if (dialogComponent && dialogComponent[dialogComponentStage] && (targetNode || destinationNode || response)) {
			const dialogRef = this.dialog.open(dialogComponent[dialogComponentStage], {
				enterAnimationDuration: '300ms',
				exitAnimationDuration: '150ms',
				closeOnNavigation: false,
				disableClose: true,
				data: {
					targetNode,
					destinationNode,
					response
				},
			});
			//TODO: 'success' handler;
			if (dialogRef.componentInstance && (dialogRef.componentInstance as any).responseEmitter) {
				(dialogRef.componentInstance as any).responseEmitter.subscribe((response: any) => {
					dialogRef.afterClosed().subscribe(dialogExitCode => {
						this.openDialogsRecursive(dialogComponent, dialogExitCode, targetNode, destinationNode, response);
					});
				});
			} else {
				dialogRef.afterClosed().subscribe(dialogExitCode => {
					this.openDialogsRecursive(dialogComponent, dialogExitCode, targetNode, destinationNode, response);
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
