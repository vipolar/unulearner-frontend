import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word, PageableResponse } from '@app/app.types';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
//import { FormsModule } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class EnglishWordlistService {

	private apiUrl = 'https://unulearner.com/backend/content/english/wordlist';

	constructor(private httpClient: HttpClient) { }

//	httpOptions = {
//		headers: new HttpHeaders({
//			'Content-Type': 'application/json'
//		})
//	};

	getAllWords(index: number, size: number, sort: string, direction: string): Observable<PageableResponse<Word>> {
		return this.httpClient.get<PageableResponse<Word>>(`${this.apiUrl}/get/all?page=${index}&size=${size}`);
	}

	getWordsFuzzy(word: string): Observable<Word[]> {
		return this.httpClient.get<Word[]>(`${this.apiUrl}/get/word?query=${word}`);
	}

	getWord(id: number): Observable<Word> {
		return this.httpClient.get<Word>(`${this.apiUrl}/get/${id}`);
	}

	createWord(word: Word): Observable<Word> {
		return this.httpClient.post<Word>(`${this.apiUrl}/add`, word, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	//`${this.apiUrl}/add/file`
	createWordList(formData: any, onUnsubscribe: any): Observable<any> {
		return this.httpClient.post(`https://unulearner.com/backend/files/upload`, formData, {
			reportProgress: true,
			observe: 'events'
		}).pipe(
			finalize(onUnsubscribe)
		);
	}

	updateWord(word: Word): Observable<Word> {
		return this.httpClient.put<Word>(`${this.apiUrl}/update/${word.id}`, word, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	deleteWord(id: number): Observable<any> {
		return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
	}
}
