import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf, StorageNode } from '@app/app.types';
import { Subscription } from 'rxjs';

@Component({
	selector: 'storage-create-directory',
	templateUrl: './directory.component.html',
	styleUrls: ['./directory.component.scss']
})
export class CreateDirectoryComponent implements OnDestroy {
	@Output() formDataChange = new EventEmitter<FormGroup>();

	private formSubscription: Subscription;
	public newDirectoryForm: FormGroup;

	public directoryCreationProgress: boolean = false;

	constructor() {
		this.newDirectoryForm = new FormGroup({
			name: new FormControl('', [Validators.required])
		});

		this.formSubscription = this.newDirectoryForm.valueChanges.subscribe(value => {
			this.formDataChange.emit(this.newDirectoryForm);
		});
	}

	ngOnDestroy(): void {
		if (this.formSubscription) {
			this.formSubscription.unsubscribe();
		}
	}

	addDirectoryDull() {
		return;
	}
}
