import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

	editFileById(id: number, formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/edit/${id}`, formData, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	getFileById(id: number): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/file/get/${id}`);
	}

	getFileLinkById(id: number): string {
		return `${this.apiUrl}/file/get/${id}`;
	}

	removeFileById(id: number): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/file/remove/${id}`);
	}

	// Directories
	saveDirectory(formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/add`, formData, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	editDirectoryById(id: number, formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/edit/${id}`, formData, {
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

	removeDirectoryById(id: number): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/directory/remove/${id}`);
	}
}
