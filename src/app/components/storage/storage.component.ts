import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from '@services/rest/storage/storage.service';
import { StorageNode } from '@app/app.types';

/* ACTIONS */
import { TransferComponent } from './transfer/transfer.component';
import { ExecuteComponent } from './execute/execute.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { RemoveComponent } from './remove/remove.component';

/* RESPONSES */
import { CloseComponent } from './close/close.component';


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
	styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
	public treeControl = new NestedTreeControl<StorageNode>(node => node.children);
	public dataSource = new MatTreeNestedDataSource<StorageNode>();
	public destinationNode: StorageNode | null = null;
	public targetNode: StorageNode | null = null;
	public dragInitiated: boolean = false;
	public actionMode = ActionMode;

	@Output() onTreeNodeSelect = new EventEmitter<any>();
	@Output() nodeDropped = new EventEmitter<any>();

	/* Because web development is a FUCKING joke!!! */
	private isMouseEvent: boolean = false;
	private isTouchEvent: boolean = false;

	constructor(
		private storageService: StorageService,
		private dialog: MatDialog
	) { }

	public onNodeTouch(event: any, targetNode: StorageNode): void {
		if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
			if (this.isMouseEvent == true) {
				return;
			}

			this.isTouchEvent = true;
			event.preventDefault();
		}

		if (typeof MouseEvent !== 'undefined' && event instanceof MouseEvent) {
			if (this.isTouchEvent == true) {
				return;
			}

			this.isMouseEvent = true;
			event.preventDefault();
		}

		if (this.targetNode && this.targetNode.id == targetNode.id) {
			this.targetNode._lastSelected = false;
		} else {
			this.targetNode = targetNode;
			this.targetNode._lastSelected = true;

			if (!this.treeControl.isExpanded(this.targetNode)) {
				this.treeControl.expand(this.targetNode);
			}
		}

		//(event.target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}

	public onNodeRelease(event: any, targetNode: StorageNode): void {
		if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
			if (this.isMouseEvent == true) {
				return;
			}

			this.isTouchEvent = true;
			event.preventDefault();
		}

		if (typeof MouseEvent !== 'undefined' && event instanceof MouseEvent) {
			if (this.isTouchEvent == true) {
				return;
			}

			this.isMouseEvent = true;
			event.preventDefault();
		}

		if (this.targetNode && this.targetNode.id == targetNode.id && !this.targetNode._lastSelected) {
			if (this.treeControl.isExpanded(targetNode)) {
				this.treeControl.collapseDescendants(targetNode);
			}

			this.targetNode._lastSelected = false;
			this.targetNode = null;
		}

		this.isMouseEvent = false;
		this.isTouchEvent = false;
	}

	public onNodeDrag(event: CdkDragStart, targetNode: StorageNode): void {
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
		event.stopPropagation();

		this.destinationNode = destinationNode;

		if (destinationNode == null || destinationNode.children == null) {
			return;
		}

		this.takeActionOnTheSelectedNode(this.actionMode.TRANSFER);
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

	takeActionOnTheSelectedNode(actionToBeTaken: ActionMode) {
		let dialogComponent: any = null;
		let dialogData: any = null;

		if (!this.targetNode) {
			return;
		}

		switch (actionToBeTaken) {
			case this.actionMode.OPEN:
				if (this.targetNode.children) {
					this.openDirectoryNode(this.targetNode);
				} else {
					this.openFileNode(this.targetNode);
				}
				return;
			case this.actionMode.CREATE:
				dialogComponent = CreateComponent;
				dialogData = {
					destinationNode: this.targetNode,
					createMode: null
				};
				break;
			case this.actionMode.CREATEFILE:
				dialogComponent = CreateComponent;
				dialogData = {
					destinationNode: this.targetNode,
					createMode: "File"
				};
				break;
			case this.actionMode.CREATEDIRECTORY:
				dialogComponent = CreateComponent;
				dialogData = {
					destinationNode: this.targetNode,
					createMode: "Directory"
				};
				break;
			case this.actionMode.TRANSFER:
				if (!this.destinationNode) {
					return;
				}

				dialogComponent = TransferComponent;
				dialogData = {
					targetNode: this.targetNode,
					destinationNode: this.destinationNode
				};
				break;
			case this.actionMode.DETAILS:
				dialogComponent = DetailsComponent;
				dialogData = {
					targetNode: this.targetNode
				};
				break;
			case this.actionMode.REMOVE:
				dialogComponent = RemoveComponent;
				dialogData = {
					targetNode: this.targetNode
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

							this.dialog.open(dialogComponent, {
								enterAnimationDuration: '300ms',
								exitAnimationDuration: '150ms',
								closeOnNavigation: false,
								disableClose: true,
								data: dialogData,
							});
							break;
						}
						case 'failure': {
							dialogComponent = CloseComponent;
							dialogData = response.error;

							this.dialog.open(dialogComponent, {
								enterAnimationDuration: '300ms',
								exitAnimationDuration: '150ms',
								closeOnNavigation: true,
								disableClose: false,
								data: dialogData,
							});
							break;
						}
					}
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
