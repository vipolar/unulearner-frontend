import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
	selector: 'components-standalone-storage',
	templateUrl: './storage.component.html',
	styleUrls: ['./storage.component.css']
})
export class StorageComponent {
	public selectedFile: String = '';
	public newFile: String = '';


	isLinear = false;

	constructor(private _formBuilder: FormBuilder) { }

	onFileSelection(file: any) {
		this.selectedFile = file.fileName;
		console.log(this.selectedFile);
	}
}
