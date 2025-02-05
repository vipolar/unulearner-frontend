import { Component, Inject, EventEmitter, Output, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '@services/rest/storage/storage.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatTabGroup } from '@angular/material/tabs';
import { catchError, filter, map, tap } from 'rxjs';
import { StorageNode } from '@app/app.types';
import { FormGroup } from '@angular/forms';

import {
	MatDialogRef,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
	selector: 'storage-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements AfterViewInit {
	@Output() responseEmitter: EventEmitter<any> = new EventEmitter();
	@ViewChild(MatTabGroup) matTabGroup: MatTabGroup | undefined;

	public destinationNode: StorageNode = this.data.destinationNode;
	public directoryCreationProgressIndicator: boolean = false;
	public fileUploadProgressIndicator: number | null = null;
	public selectInitalTab: string = this.data.createMode;
	public formSubmissionSubscription: any = undefined;
	public formSubmissionResponse: any = undefined;

	public newDirectoryForm: FormGroup | null = null;
	public newFileForm: FormGroup | null = null;

	public selectedTab: string = "selected";

	constructor(
		private changeDR: ChangeDetectorRef,
		private storageService: StorageService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<CreateComponent>,
	) { }

	ngAfterViewInit(): void {
		if (this.matTabGroup != null) {
			const allTabs = this.matTabGroup._allTabs.toArray();
			const selectedIndex = this.matTabGroup.selectedIndex != null ? this.matTabGroup.selectedIndex : 0;

			if (this.selectInitalTab != null) {
				for (let index = 0; index < allTabs.length; index++) {
					if (allTabs[index].textLabel.toLocaleLowerCase() === this.selectInitalTab.toLocaleLowerCase()) {
						this.matTabGroup.selectedIndex = index;
						break;
					}
				}
			}

			setTimeout(() => {
				// Change detection is triggered manually after the change
				this.selectedTab = allTabs[selectedIndex].textLabel;
				this.changeDR.detectChanges();
			}, 0);
		} else {
			this.responseEmitter.emit({
				error: {
					errorMessage: "Failed to initialize node creation dialog.",
					errorStatus: 1001
				}
			});
			this.dialogRef.close('failure');
			return;
		}
	}

	public updateDirectoryFormData(data: any): void {
		this.newDirectoryForm = data;
	}

	public updateFileFormData(data: any): void {
		this.newFileForm = data;
	}

	public createFormTabChanged(data: any) {
		this.selectedTab = data.tab.textLabel;
	}

	public uploadFile(): void {
		if (this.newFileForm == null || !this.newFileForm.valid) {
			return;
		}

		if (this.destinationNode.id == null) {
			return;
		}

		const formValues = this.newFileForm.value;
		const storageServiceObservable = this.storageService.scp(formValues.file, this.destinationNode.id, formValues.name != formValues.file.name ? formValues.name : null);
		this.formSubmissionSubscription = storageServiceObservable
			.pipe(
				tap(event => {
					if (event.type === HttpEventType.UploadProgress && event.total) {
						this.fileUploadProgressIndicator = Math.round(100 * (event.loaded / event.total));
					}
				}),
				filter(event => event instanceof HttpResponse),
				map((event: any) => event as HttpResponse<any>),
				catchError(error => {
					throw error;
				})
			)
			.subscribe({
				next: (response: HttpResponse<any>) => {
					this.formSubmissionResponse = response;
					this.fileUploadProgressIndicator = null;

					this.responseEmitter.emit({ response });
					this.dialogRef.close('success');
				},
				error: (error: any) => {
					this.formSubmissionResponse = error;
					this.fileUploadProgressIndicator = null;

					if (error.status == 403 || error.status == 401) {
						this.responseEmitter.emit({
							error: {
								errorMessage: "Access denied!",
								errorStatus: error.status
							}
						});

						this.dialogRef.close('failure');
						return;
					}

					this.responseEmitter.emit({ error });
					this.dialogRef.close('failure');
				}
			});
	}

	public createDirectory() {
		if (this.newDirectoryForm == null || !this.newDirectoryForm.valid) {
			return;
		}

		if (this.destinationNode.id == null) {
			return;
		}

		const formValues = this.newDirectoryForm.value;
		this.directoryCreationProgressIndicator = formValues.name != null;
		const storageServiceObservable = this.storageService.mkdir(this.destinationNode.id, formValues.name);
		this.formSubmissionSubscription = storageServiceObservable
			.subscribe({
				next: (response: HttpResponse<any>) => {
					this.formSubmissionResponse = response;
					this.directoryCreationProgressIndicator = false;

					this.responseEmitter.emit({ response });
					this.dialogRef.close('success');
				},
				error: (error: any) => {
					this.formSubmissionResponse = error;
					this.directoryCreationProgressIndicator = false;
					
					if (error.status == 403 || error.status == 401) {
						this.responseEmitter.emit({
							error: {
								errorMessage: "Access denied!",
								errorStatus: error.status
							}
						});

						this.dialogRef.close('failure');
						return;
					}

					this.responseEmitter.emit({ error });
					this.dialogRef.close('failure');
				}
			});
	}
}
