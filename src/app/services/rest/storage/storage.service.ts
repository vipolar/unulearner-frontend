import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Word, PageableResponse } from '@app/app.types';
import { Observable, finalize } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	private apiUrl = 'https://unulearner.com/backend/storage';

	constructor(private httpClient: HttpClient) { }

	// Files
	saveFile(formData: any): Observable<HttpEvent<any>> {
		return this.httpClient.post<HttpEvent<any>>(`${this.apiUrl}/file/add`, formData, {
			reportProgress: true,
			responseType: 'json',
			observe: 'events'
		});
	}

	getFileById(id: number): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/file/get/${id}`);
	}

	// Directories
	saveDirectory(formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/add`, formData, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	getRootDirectory(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/directory/get/root`);
	}

	getDirectoryById(id: number): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/directory/get/${id}`);
	}
}
