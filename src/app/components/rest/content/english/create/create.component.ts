import { Component } from '@angular/core';

import { EnglishWordlistService } from '@services/rest/content/english/wordlist/english-wordlist.service';

import { HttpEventType } from '@angular/common/http';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent {
	public uploadProgress: number | null = null;
	public uploadSubscription: any | undefined;
	public wordlistFile: String = '';

	constructor(
		private englishWordlistService: EnglishWordlistService
	) { }

	createWordlistFromFile(event: Event): void {
		const fileInput = event.target as HTMLInputElement | null;

		if (fileInput && fileInput.files && fileInput.files.length) {
			const file: File = fileInput.files[0];
			this.wordlistFile = file.name;

			const formData = new FormData();
			formData.append("file", file);
			formData.append("dir", "/");

			this.uploadSubscription = this.englishWordlistService.createWordList(formData, () => {
				this.uploadProgress = null;
				this.wordlistFile = '';
			})
				.subscribe(event => {
					if (event.type == HttpEventType.UploadProgress) {
						this.uploadProgress = Math.round(100 * (event.loaded / event.total));
					}
				});
		}
	}

	cancelUpload() {
		this.uploadSubscription.unsubscribe();
	}
}
