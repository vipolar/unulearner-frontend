import { Component, OnInit } from '@angular/core';
import { EnglishWordlistService } from '@services/rest/content/english/wordlist/english-wordlist.service';
import { Word, PageableResponse } from '@app/app.types';

@Component({
	selector: 'app-english-wordlist',
	templateUrl: './english-wordlist.component.html',
	styleUrls: ['./english-wordlist.component.css']
})
export class EnglishWordlistComponent implements OnInit {
	wordList: Word[] = [];

	newWord: Word = {
		id: null,
		word: ''
	};

	constructor(private englishWordlistService: EnglishWordlistService) { }

	ngOnInit(): void {
		this.loadWordlist();
	}

	loadWordlist(): void {
		this.englishWordlistService.getAllWords()
			.subscribe({
				next: (response: PageableResponse<Word>) => {
					this.wordList = response.content || [];
				},
				error: error => console.error('Error loading wordlist:', error)
			});
	}

	deleteWord(id: number): void {
		this.englishWordlistService.deleteWord(id)
			.subscribe(() => {
				this.loadWordlist();
			});
	}

	createWord(): void {
		this.englishWordlistService.createWord(this.newWord)
			.subscribe(() => {
				this.loadWordlist();
			});
	}
}
