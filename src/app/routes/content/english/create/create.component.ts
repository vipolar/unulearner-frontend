import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { EnglishWordlistService } from '@services/rest/content/english/wordlist/english-wordlist.service';
import { ControlsOf, Word, urlRegEx } from '@app/app.types';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


	constructor(
		private englishWordlistService: EnglishWordlistService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	newWordForm = new FormGroup<ControlsOf<Word>>({
		id: new FormControl(null, {
			validators: [Validators.required],
			nonNullable: false,
			updateOn: 'blur'
		}),
		word: new FormControl("", {
			validators: [Validators.required],
			nonNullable: true,
			updateOn: 'blur'
		}),
		url: new FormControl("", {
			validators: [Validators.required, Validators.pattern(urlRegEx)],
			nonNullable: true,
			updateOn: 'blur'
		})
	});

	ngOnInit() {
		this.activatedRoute.queryParams
			.subscribe(params => {
				this.newWordForm.patchValue({ word: decodeURIComponent(params['word']) });
			});
	}

	onSubmitNewWordForm() {
		if (this.newWordForm.value['id'] === undefined) {
			return;
		} else if (this.newWordForm.value['word'] === undefined) {
			return;
		} else if (this.newWordForm.value['url'] === undefined) {
			return;
		}
		
		const newWord: Word = {
			id: this.newWordForm.value['id'],
			word: this.newWordForm.value['word'],
			url: this.newWordForm.value['url']
		}

		this.createWord(newWord);
	}

	createWord(newWord: Word): void {
		this.englishWordlistService.createWord(newWord)
			.subscribe((response: Word) => {
				console.log(response);
			});
	}
}
