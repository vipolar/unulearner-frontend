import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StorageService } from '@services/rest/storage/storage.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface StorageNode {
	id: number;
	url: string;
	name: string;
	created: string;
	updated: string;
	description: string;
	isDirectory: boolean;
	childNodes: StorageNode[];
}

@Component({
	selector: 'storage-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
	public treeControl = new NestedTreeControl<StorageNode>(node => node.childNodes);
	public dataSource = new MatTreeNestedDataSource<StorageNode>();

	public metadata: any = null;
	public storageTree: any;

	@Output() onTreeNodeSelect = new EventEmitter<any>();

	constructor(
		private storageService: StorageService
	) { }

	public onTreeNodeClick(fileName: any, isDirectory: boolean): void {
		this.onTreeNodeSelect.emit({
			isDirectory: isDirectory,
			fileName: fileName
		});
	}

	ngOnInit() {
		this.storageService.getRootDirectory()
			.subscribe(response => {
				this.dataSource.data = [response];
				console.log(this.dataSource.data);
			});
	}

	hasChild = (_: number, node: StorageNode) =>
		node.childNodes && node.childNodes.length > 0 || node.isDirectory
}
