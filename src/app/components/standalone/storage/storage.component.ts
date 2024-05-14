import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from '@services/rest/storage/storage.service';
import { StorageNode } from '@app/app.types';

/* ACTIONS */
import { CreateComponent } from './create/create.component';
import { CreateFileComponent } from './create/create-file/create-file.component';
import { CreateDirectoryComponent } from './create/create-directory/create-directory.component';
import { TransferComponent } from './transfer/transfer.component';
import { DetailsComponent } from './details/details.component';
import { RemoveComponent } from './remove/remove.component';
import { ExecuteComponent } from './execute/execute.component';

/* RESPONSES */
import { SuccessComponent } from './success/success.component';
import { ConflictComponent } from './conflict/conflict.component';
import { FailureComponent } from './failure/failure.component';
import { DeniedComponent } from './denied/denied.component';
import { CancelComponent } from './cancel/cancel.component';

export enum ActionMode {
	OPEN,
	CREATE,
	CREATEFILE,
	CREATEDIRECTORY,
	TRANSFER,
	DETAILS,
	REMOVE
}

@Component({
	selector: 'app-storage',
	templateUrl: './storage.component.html',
	styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
	public treeControl = new NestedTreeControl<StorageNode>(node => node.children);
	public dataSource = new MatTreeNestedDataSource<StorageNode>();
	public selectedNode: StorageNode | null = null;
	public actionMode = ActionMode;

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

		//(event.target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
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
			target.style.left = `${movedRect.x - 15}px`;
			target.style.top = `${movedRect.y - 15}px`;
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
					detail: { data: node }, // You can attach additional data
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
		const targetNode: StorageNode = event.detail.data;

		if (targetNode == null || destinationNode == null) {
			return;
		}

		if (destinationNode.children == null) {
			return;
		}

		this.takeActionOnTheSelectedNode(this.actionMode.TRANSFER, targetNode, destinationNode);
	}

	openDirectoryNode(targetNode: StorageNode) {
		if (targetNode.children == null) {
			return;
		}
		//TODO: link to back;
		this.dataSource.data = [targetNode];
	}

	openFileNode(targetNode: StorageNode) {
		if (targetNode.children != null) {
			return;
		}
	}


	takeActionOnTheSelectedNode(actionToBeTaken: ActionMode, targetNode: StorageNode, destinationNode?: StorageNode) {
		let dialogComponent: any = null;
		let dialogData: any = null;

		switch (actionToBeTaken) {
			case this.actionMode.OPEN:
				if (targetNode.children) {
					this.openDirectoryNode(targetNode);
				} else {
					this.openFileNode(targetNode);
				}
				return;
			case this.actionMode.CREATE:
				dialogComponent = CreateComponent;
				dialogData = {
					destinationNode: targetNode
				};
				break;
			case this.actionMode.CREATEFILE:
				dialogComponent = CreateFileComponent;
				dialogData = {
					destinationNode: targetNode
				};
				break;
			case this.actionMode.CREATEDIRECTORY:
				dialogComponent = CreateDirectoryComponent;
				dialogData = {
					destinationNode: targetNode
				};
				break;
			case this.actionMode.TRANSFER:
				dialogComponent = TransferComponent;
				dialogData = {
					targetNode: targetNode,
					destinationNode: destinationNode
				};
				break;
			case this.actionMode.DETAILS:
				dialogComponent = DetailsComponent;
				dialogData = {
					targetNode: targetNode
				};
				break;
			case this.actionMode.REMOVE:
				dialogComponent = RemoveComponent;
				dialogData = {
					targetNode: targetNode
				};
				break;
			default:
				return;
		}

		const dialogRef = this.dialog.open(dialogComponent, {
			enterAnimationDuration: '300ms',
			exitAnimationDuration: '150ms',
			closeOnNavigation: true,
			disableClose: false,
			data: dialogData,
		});

		if (dialogRef.componentInstance && (dialogRef.componentInstance as any).responseEmitter) {
			(dialogRef.componentInstance as any).responseEmitter.subscribe((response: any) => {
				dialogRef.afterClosed().subscribe(dialogExitCode => {
					switch (dialogExitCode) {
						case 'success': {
							dialogComponent = ExecuteComponent;
							dialogData = response.response;
							break;
						}
						case 'failure': {
							dialogComponent = FailureComponent;
							dialogData = response.error;
							break;
						}
						default: {
							//statements;
							break;
						}
					}

					this.dialog.open(dialogComponent, {
						enterAnimationDuration: '300ms',
						exitAnimationDuration: '150ms',
						closeOnNavigation: true,
						disableClose: false,
						data: dialogData,
					});
				});
			});
		}
	}

	ngOnInit() {
		this.storageService.getRootDirectory()
			.subscribe(response => {
				this.dataSource.data = [response];
			});
	}

	hasChild = (_: number, node: StorageNode) =>
		node.children && node.children.length > 0 || node.children != null
}
