import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs';

import { Sort, SortDirection } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

import { EnglishDictionaryService } from '@services/rest/content/english/dictionary/english-dictionary.service';
import { EnglishWordlistService } from '@services/rest/content/english/wordlist/english-wordlist.service';
import { Word, Dictionary, PageableResponse } from '@app/app.types';

@Component({
	selector: 'content-english',
	templateUrl: './english.component.html',
	styleUrls: ['./english.component.css']
})
export class EnglishComponent implements OnInit {
	public wordlistCurrentlyQuerying: boolean = false;
	public wordlistFooterExpanded: boolean = false;

	public searchControl = new FormControl();
	public dictionary: Dictionary[] = [];
	public wordlist: Word[] = [];

	public wordlistPageSizeOptions: number[] = [5, 15, 25, 50, 100, 250, 500];
	public wordlistPageIndex: number = 0;
	public wordlistPageSize: number = 15;
	public wordlistEntries: number = 0;

	public wordlistSortOptions = [
		{ header: 'id', text: 'ID' },
		{ header: 'word', text: 'Word' },
		{ header: 'status', text: 'Status' },
		{ header: 'entries', text: 'Entries' }
	]

	public wordlistSortDirectionDefault: SortDirection = 'desc';
	public wordlistSortBy = this.wordlistSortOptions[1].header;
	public wordlistSortDirection: SortDirection = 'desc';

	public wordlistSearchStringValue: string = '';

	public onWordlistEventTimeOut: number = 300;
	public onWordlistEventTimer: any = null;

	constructor(
		private englishDictionaryService: EnglishDictionaryService,
		private englishWordlistService: EnglishWordlistService,
	) { }

	ngOnInit() {
		this.loadWordsMasterlist();
	}

	/* TODO:
	* checks against DB
	* css!
	* html touch-ups
	*/

	/*public searchValueExistsInDatabase(input: string, list: Word[]): boolean {

	}*/

	public getRndInteger(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	public encodeSearchValue(value: string): string {
		return encodeURIComponent(value);
	}

	public onWordlistSortHeaderEvent(matSelectChange: Sort) {
		this.wordlistSortDirection = matSelectChange.direction;
		this.wordlistSortBy = matSelectChange.active;
		clearTimeout(this.onWordlistEventTimer);

		this.onWordlistEventTimer = setTimeout(() => {
			this.wordlistCurrentlyQuerying = true;
			this.loadWordsMasterlist();
		}, this.onWordlistEventTimeOut);
	}

	public onWordlistPaginatorEvent(pageEvent: PageEvent) {
		this.wordlistPageIndex = pageEvent.pageIndex;
		this.wordlistPageSize = pageEvent.pageSize;
		clearTimeout(this.onWordlistEventTimer);

		this.onWordlistEventTimer = setTimeout(() => {
			this.wordlistCurrentlyQuerying = true;
			this.loadWordsMasterlist();
		}, this.onWordlistEventTimeOut);
	}

	public onWordlistSearchEvent(searchValue: string) {
		clearTimeout(this.onWordlistEventTimer);
		this.wordlistFooterExpanded = false;

		this.onWordlistEventTimer = setTimeout(() => {
			this.wordlistCurrentlyQuerying = true;

			if (searchValue) {
				this.queryWordsMasterlist(searchValue);
			} else {
				this.loadWordsMasterlist();
			}
		}, this.onWordlistEventTimeOut);
	}

	public onWordlistEntryClickEvent(id: number) {
		this.queryMasterDictionary(id);
	}

	private loadWordsMasterlist() {
		this.englishWordlistService.getAllWords(this.wordlistPageIndex, this.wordlistPageSize, this.wordlistSortBy, this.wordlistSortDirection)
			.pipe(delayWhen(_response => timer(this.getRndInteger(200, 500))))
			.subscribe({
				next: (response: PageableResponse<Word>) => {
					this.wordlistPageIndex = response.pageable.pageNumber;
					this.wordlistPageSize = response.pageable.pageSize;
					this.wordlistEntries = response.totalElements;
					this.wordlist = response.content || [];

					this.wordlistCurrentlyQuerying = false;
				},
				error: error => console.error('Error loading master wordlist:', error)
			});
	}

	private queryWordsMasterlist(word: string) {
		this.englishWordlistService.getWordsFuzzy(word)
			.pipe(delayWhen(_response => timer(this.getRndInteger(50, 200))))
			.subscribe({
				next: (response: Word[]) => {
					this.wordlist = response || [];
					console.log(response);

					this.wordlistCurrentlyQuerying = false;
				},
				error: error => console.error('Error querying master wordlist:', error)
			});
	}

	private queryMasterDictionary(id: number) {
		this.englishDictionaryService.getDictionary(id)
			.pipe(delayWhen(_response => timer(this.getRndInteger(100, 250))))
			.subscribe({
				next: (response: Dictionary[]) => {
					this.dictionary = response || [];
					console.log(this.dictionary);

					this.wordlistCurrentlyQuerying = false;
				},
				error: error => console.error('Error loading dictionary:', error)
			});
	}

	buttonOne() {
		console.log(this);
	}

	buttonTwo() {
		console.log(this);
	}

	buttonThree() {
		console.log(this);
	}

	/*
		
	
		deleteWord(id: number): void {
			this.englishWordlistService.deleteWord(id)
				.subscribe(() => {
					this.loadWordlist();
				});
		}
	
		
	*/
}
