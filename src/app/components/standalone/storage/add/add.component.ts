import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { StorageService } from '@services/rest/storage/storage.service';
import { catchError, filter, map, tap } from 'rxjs';

import { ControlsOf, StorageNode } from '@app/app.types';

@Component({
	selector: 'storage-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	public fileUploadProgress: number | null = null;
	public fileUploadSubscription: any | undefined;
	public fileUploadTarget: File | null = null;
	public fileUploadTargetName: String = '';

	fileForm = new FormGroup({
		description: new FormControl<String | null>(null, Validators.required),
		parent: new FormControl<Number | null>(null, Validators.required),
		file: new FormControl<File | null>(null, Validators.required), /* [Validators.required, requiredFileType('png')] */
	});

	constructor(
		private storageService: StorageService
	) { }

	ngOnInit() {
		//console.log('uploader!');
		//this.createDirectory("1", "dirone");
		//this.createDirectory("1", "dirtwo");
		//this.createDirectory("1", "dirthree");
		//this.createDirectory("3", "dirfour");
		//this.createDirectory("5", "dirfive");
	}

	submit() {
		console.log(this.fileUploadTarget);
	}

	onSelectFileForUpload(event: Event): void {
		const fileInput = event.target as HTMLInputElement | null;

		if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
			return;
		}

		const selectedFile = fileInput.files[0];
		this.fileUploadTargetName = selectedFile.name;
		this.fileUploadTarget = selectedFile;
		this.fileForm.patchValue({file: selectedFile});
	}

	onDeselectFileForUpload(): void {
		this.fileForm.patchValue({file: null});
		this.fileUploadTargetName = '';
	}

	onCancelFileUpload(): void {
		this.fileUploadSubscription.unsubscribe();
	}

	addFile(): void {
		if (this.fileUploadTarget == null) {
			return;
		}

		const formData = new FormData();

		formData.append('parent', '1');
		formData.append('content', this.fileUploadTarget);
		formData.append('description', '!');

		this.fileUploadSubscription = this.storageService.saveFile(formData)
			.pipe(
				tap(event => {
					if (event.type === HttpEventType.UploadProgress && event.total) {
						this.fileUploadProgress = Math.round(100 * (event.loaded / event.total));
					}
				}),
				filter(event => event.type === HttpEventType.Response),
				map(event => event as HttpResponse<any>),
				catchError(error => {
					console.error('Error uploading file:', error); // Handle error as needed
					throw error; // Rethrow the error to propagate it to the subscribe error handler
				})
			)
			.subscribe({
				next: (response: HttpResponse<any>) => {
					this.fileUploadProgress = null;
					this.fileUploadTargetName = '';
					console.log(response);
				},
				error: (error: any) => {
					//console.log(error);
				}
			});
	}

	addDirectory(id: string, name: string) {
		const formData = new FormData();

		formData.append('parent', id);
		formData.append('directory', name);
		formData.append('description', 'a new directory');

		this.storageService.saveDirectory(formData)
			.subscribe(response =>
				console.log(response)
			);
	}
}
