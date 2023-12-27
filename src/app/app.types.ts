import { FormControl, FormGroup } from "@angular/forms";

export type ControlsOf<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends Record<any, any>
	? FormGroup<ControlsOf<T[K]>>
	: FormControl<T[K]>;
};

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

export interface StorageNode {
	id: string;
	url: string;
	name: string;
	created: string;
	updated: string;
	description: string;
	isDirectory: boolean;
	childNodes: StorageNode[];
}

/* Spring boot pageable response and its components */
export interface PageableResponse<T> {
	content: T[] | null;
	pageable: Pageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	number: number;
	sort: Sort;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

export interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: Sort;
	offset: number;
	paged: boolean;
	unpaged: boolean;
}

export interface Sort {
	empty: boolean;
	unsorted: boolean;
	sorted: boolean;
}

/* Useful stuff */
export let urlRegEx: string = '[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?';