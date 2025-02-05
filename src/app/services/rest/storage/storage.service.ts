import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	private apiUrl = 'https://unulearner.com/backend/storage';
	constructor(private httpClient: HttpClient) { };

	//TODO: arguments
	exec(taskUUID: string): Observable<any> {
		let requestUrl: string = `${this.apiUrl}/exec/${taskUUID}`;

		return this.httpClient.get(requestUrl, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	ls(targetUUID: string | null): Observable<any> {
		let requestUrl: string = `${this.apiUrl}/ls`;
		if (targetUUID != null && targetUUID.trim().length !== 0) {
			requestUrl += `/${targetUUID}`;
		}

		return this.httpClient.get(requestUrl);
	}

	scp(file: File, destinationUUID: string, newFileName: string | null): Observable<HttpEvent<any>> {
		let requestUrl: string = `${this.apiUrl}/scp/${destinationUUID}`;
		if (newFileName != null && newFileName.trim().length !== 0) {
			requestUrl += `/${encodeURIComponent(newFileName)}`;
		}

		const formData = new FormData();
		formData.append('file', file, file.name);
		return this.httpClient.post<HttpEvent<any>>(requestUrl, formData, {
			reportProgress: true,
			responseType: 'json',
			observe: 'events',
		});
	}

	mkdir(destinationUUID: string, newDirectoryName: string): Observable<any> {
		let requestUrl: string = `${this.apiUrl}/mkdir/${destinationUUID}/${encodeURIComponent(newDirectoryName)}`;

		return this.httpClient.post(requestUrl, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	cp(targetUUID: string, destinationUUID: string, newNodeName: string | null): Observable<any> {
		let requestUrl: string = `${this.apiUrl}/cp/${targetUUID}/${destinationUUID}`;
		if (newNodeName != null && newNodeName.trim().length !== 0) {
			requestUrl += `/${encodeURIComponent(newNodeName)}`;
		}

		return this.httpClient.post(requestUrl, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	mv(targetUUID: string, destinationUUID: string, newNodeName: string | null): Observable<any> {
		let requestUrl: string = `${this.apiUrl}/mv/${targetUUID}/${destinationUUID}`;
		if (newNodeName != null && newNodeName.trim().length !== 0) {
			requestUrl += `/${encodeURIComponent(newNodeName)}`;
		}

		return this.httpClient.post(requestUrl, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	//TODO: implement in backend!!!
	ln(targetUUID: string, destinationUUID: string, newNodeName: string | null): Observable<any> {
		let requestUrl: string = `${this.apiUrl}/ln/${targetUUID}/${destinationUUID}`;
		if (newNodeName != null && newNodeName.trim().length !== 0) {
			requestUrl += `/${encodeURIComponent(newNodeName)}`;
		}

		return this.httpClient.post(requestUrl, null, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}

	//TODO: take params out of here
	chmod(targetUUID: string, options: string, recursive: boolean): Observable<any> {
		const params = new HttpParams().set('options', options).set('recursive', recursive);
		let requestUrl: string = `${this.apiUrl}/chmod/${targetUUID}`;
		
		return this.httpClient.post<HttpEvent<any>>(requestUrl, null, {
			reportProgress: true,
			responseType: 'json',
			observe: 'events',
			params: params
		});
	}

	//TODO: take params out of here
	chown(targetUUID: string, user: string | null, group: string | null, recursive: boolean): Observable<any> {
		const owners: string = `${user ?? ''}${group != null ? `:${group}` : ''}`;
		const params = new HttpParams().set('owners', owners).set('recursive', recursive);
		let requestUrl: string = `${this.apiUrl}/chown/${targetUUID}`;

		return this.httpClient.post<HttpEvent<any>>(requestUrl, null, {
			reportProgress: true,
			responseType: 'json',
			observe: 'events',
			params: params
		});
	}

	wget(targetUUID: string): Observable<HttpEvent<any>> {
		let requestUrl: string = `${this.apiUrl}/wget/${targetUUID}`;

		return this.httpClient.get((requestUrl), {
			reportProgress: true,
			responseType: 'json',
			observe: 'events'
		});
	}

	//TODO: add params somewhere?
	doc(targetUUID: string): Observable<HttpEvent<any>> {
		let requestUrl: string = `${this.apiUrl}/doc/${targetUUID}`;

		return this.httpClient.get((requestUrl), {
			reportProgress: true,
			responseType: 'json',
			observe: 'events'
		});
	}

	//TODO: take params out of here (add them first?)
	rm(targetUUID: string): Observable<any> {
		let requestUrl: string = `${this.apiUrl}/rm/${targetUUID}`;

		return this.httpClient.delete(requestUrl, {
			reportProgress: false,
			responseType: 'json',
			observe: 'response'
		});
	}
}
