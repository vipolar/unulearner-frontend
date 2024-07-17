import { FormControl, FormGroup } from "@angular/forms";

export interface Word {
	id: number | null;
	word: string;
	url: string;
}

export interface Dictionary {
	id: number
	partOfSpeech: string
	definition: string
	context: string
}

/* Storage interfaces */
export interface StorageNode {
	id: string;
	created: string;
	updated: string;
	onDiskURL: string;
	onDiskName: string;
	description: string;
	isAccessible: boolean;
	_lastSelected?: boolean;
	children: StorageNode[] | null;
}

export interface StorageTask {
	taskID: string;
	taskState: string;
	options: ExceptionOption[] | null;
	action: {
		message: string;
		timeLeft: number;
		attemptCounter: number;
		actionHeader: string | null;
		exceptionType: string | null;
		exceptionMessage: string | null;
		newStorageNode?: StorageNode | null;
		targetStorageNode?: StorageNode | null;
		conflictStorageNode?: StorageNode | null;
		destinationStorageNode?: StorageNode | null;
	};
}

export interface ExceptionOption {
	value: string;
	displayText: string;
	parameters: {
		[key: string]: string;
	};
}

/* Spring boot pageable response and its components */
export interface PageableResponse<T> {
	numberOfElements: number;
	totalElements: number;
	content: T[] | null;
	pageable: Pageable;
	totalPages: number;
	number: number;
	first: boolean;
	empty: boolean;
	last: boolean;
	size: number;
	sort: Sort;
}

export interface Pageable {
	pageNumber: number;
	unpaged: boolean;
	pageSize: number;
	paged: boolean;
	offset: number;
	sort: Sort;
}

export interface Sort {
	unsorted: boolean;
	sorted: boolean;
	empty: boolean;
}

/* Useful stuff */
export let urlRegEx: string = '[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?';

export type ControlsOf<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends Record<any, any>
	? FormGroup<ControlsOf<T[K]>>
	: FormControl<T[K]>;
};
