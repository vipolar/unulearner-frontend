import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	private apiUrl = 'https://unulearner.com/backend/storage';
	constructor(private httpClient: HttpClient) { };

	//**********************************************************//
    //*                                                        *//
    //*   From here on, it be all about THEM single files!     *//
    //*                                                        *//
    //**********************************************************//

	//TODO:!!!
	addFileToById(formData: any, destinationId: string): Observable<HttpEvent<any>> {
		return this.httpClient.post<HttpEvent<any>>(`${this.apiUrl}/upload/file/to/${destinationId}`, formData, {
			reportProgress: true,
			responseType: 'json',
			observe: 'events'
		});
	}

	//TODO:!!!
	updateFileById(formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/file/update`, formData, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	copyFileByIdToById(targetId: string, destinationId: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/copy/file/${targetId}/to/${destinationId}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	moveFileByIdToById(targetId: string, destinationId: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/move/file/${targetId}/to/${destinationId}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	downloadFileById(targetId: string): Observable<HttpEvent<any>> {
		return this.httpClient.get((`${this.apiUrl}/download/file/${targetId}`), {
			reportProgress: true,
			responseType: 'json',
			observe: 'events'
		});
	}

	deleteFileById(targetId: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/delete/file/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	//*********************************************************//
    //*                                                       *//
    //*   From here on, it be all about THEM directories!     *//
    //*                                                       *//
    //*********************************************************//
	//TODO: !!!
	addDirectoryToById(formData: any, destinationId: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/create/directory/in/${destinationId}`, formData, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	//TODO: !!!
	updateDirectoryById(formData: any): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/update/directory`, formData, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	copyDirectoryByIdToById(targetId: string, destinationId: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/copy/directory/${targetId}/to/${destinationId}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	moveDirectoryByIdToById(targetId: string, destinationId: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/move/directory/${targetId}/to/${destinationId}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	downloadDirectoryById(targetId: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/download/directory/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	deleteDirectoryById(targetId: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/delete/directory/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

    //***************************************************//
    //*                                                 *//
    //*   From here on, it be all about THEM tasks!     *//
    //*                                                 *//
    //***************************************************//

	//TODO: arguments
	executeTaskById(targetId: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/execute/task/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	cancelTaskById(targetId: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/cancel/task/${targetId}`, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}


    //***************************************************//
    //*                                                 *//
    //*   From here on, it be all about THEM rests!     *//
    //*                                                 *//
    //***************************************************//

	//TODO: !!!
	getRootDirectory(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/root/download`);
	}

	//TODO: !!!
	getFileLinkById(targetId: string): string {
		return `${this.apiUrl}/file/get/${targetId}`;
	}

	//TODO: !!!
	createShortcutByIdToById(targetId: string, destinationId: string): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/link/file/${targetId}/to/${destinationId}`, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}
}
