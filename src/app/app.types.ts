export interface Word {
	id: number | null;
	word: string;
}

/* Spring boot pageable response and its components */
export interface PageableResponse<T> {
	content?: T[] | null;
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
