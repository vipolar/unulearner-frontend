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

	copyFileByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/copy/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	moveFileByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/move/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	editFileById(targetId: string, formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/edit/${targetId}`, formData, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	getFileById(targetId: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/file/get/${targetId}`);
	}

	getFileLinkById(targetId: string): string {
		return `${this.apiUrl}/file/get/${targetId}`;
	}

	removeFileById(targetId: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/file/delete/${targetId}`);
	}

	// Directories
	saveDirectory(formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/add`, formData, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	copyDirectoryByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/copy/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	moveDirectoryByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/move/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	editDirectoryById(targetId: string, formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/edit/${targetId}`, formData, {
			reportProgress: false,
			responseType: 'json',
		});
	}

	getRootDirectory(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/directory/get/root`);
	}

	getDirectoryById(targetId: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/directory/get/${targetId}`);
	}

	removeDirectoryById(targetId: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/directory/delete/${targetId}`);
	}
}
