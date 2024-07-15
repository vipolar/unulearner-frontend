import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DateService {
	constructor() { };

	dateTimeLocale(targetLocale: string, targetDateString: string): string | null {
		targetLocale = (targetLocale == null || targetLocale.length == 0) ? 'en-US' : targetLocale;
		return new DatePipe(targetLocale).transform(new Date(targetDateString), 'yyyy-MM-dd HH:mm:ss');
	}
}
