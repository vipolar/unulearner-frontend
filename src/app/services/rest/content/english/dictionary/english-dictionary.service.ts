import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dictionary } from '@app/app.types';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EnglishDictionaryService {

	private apiUrl = 'https://unulearner.com/backend/content/english/dictionary';

	constructor(private httpClient: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	getDictionary(rootWordId: number): Observable<Dictionary[]> {
		return this.httpClient.get<Dictionary[]>(`${this.apiUrl}/get/${rootWordId}`);
	}
}
