import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Word, PageableResponse } from '@app/app.types';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EnglishWordlistService {

	private apiUrl = 'https://unulearner.com/backend/content/english';

	constructor(private httpClient: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	getAllWords(): Observable<PageableResponse<Word>> {
		return this.httpClient.get<PageableResponse<Word>>(`${this.apiUrl}/get/all`);
	}

	getWord(id: number): Observable<Word> {
		return this.httpClient.get<Word>(`${this.apiUrl}/get/${id}`);
	}

	createWord(Word: Word): Observable<Word> {
		return this.httpClient.post<Word>(`${this.apiUrl}/add`, Word, this.httpOptions);
	}

	updateWord(Word: Word): Observable<Word> {
		return this.httpClient.put<Word>(`${this.apiUrl}/update/${Word.id}`, Word, this.httpOptions);
	}

	deleteWord(id: number): Observable<any> {
		return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
	}
}
