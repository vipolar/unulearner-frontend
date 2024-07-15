import { Component, Input } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';

import { DateService } from '@services/miscellaneous/date/date.service'

import { StorageNode } from '@app/app.types';

@Component({
	selector: 'standalone-storage-node',
	templateUrl: './storage-node.component.html',
	styleUrls: ['./storage-node.component.scss'],
	imports: [
		MatExpansionModule
	],
	standalone: true
})
export class StorageNodeComponent {
	@Input() title!: string;
	@Input() node!: StorageNode;
	@Input() expand: boolean = false;

	constructor(
		private dateService: DateService
	) { }

	ngOnInit() {
		const created = this.dateService.dateTimeLocale('en-US', this.node.created);
		this.node.created = created != null ? created : 'N/A';

		const updated = this.dateService.dateTimeLocale('en-US', this.node.updated);
		this.node.updated = updated != null ? updated : 'N/A';
	}
}
