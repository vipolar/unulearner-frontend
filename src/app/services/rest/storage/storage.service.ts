import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	private apiUrl = 'https://unulearner.com/backend/storage';

	constructor(private httpClient: HttpClient) { }

	/* FILES */
	addFileToById(formData: any, destinationId: string): Observable<HttpEvent<any>> {
		return this.httpClient.post<HttpEvent<any>>(`${this.apiUrl}/file/add/to/${destinationId}`, formData, {
			reportProgress: true,
			responseType: 'json',
			observe: 'events'
		});
	}

	updateFileById(targetId: string, formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/update/${targetId}`, formData, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	copyFileByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/copy/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	moveFileByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/move/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	downloadFileById(targetId: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/file/download/${targetId}`);
	}

	deleteFileById(targetId: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/file/delete/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	/* DIRECTORIES */
	addDirectoryToById(formData: any, destinationId: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/add/to/${destinationId}`, formData, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	updateDirectoryById(targetId: string, formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/edit/${targetId}`, formData, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	copyDirectoryByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/copy/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	moveDirectoryByIdToById(targetId: string, destinationId: string, conflictOption: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/directory/move/${targetId}/to/${destinationId}?conflict=${conflictOption}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	downloadDirectoryById(targetId: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/directory/download/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	deleteDirectoryById(targetId: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/directory/delete/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	/* THE REST */
	getRootDirectory(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/root/download`);
	}

	getFileLinkById(targetId: string): string {
		return `${this.apiUrl}/file/get/${targetId}`;
	}
}
