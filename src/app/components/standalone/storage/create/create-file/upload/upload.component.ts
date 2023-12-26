import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'storage-create-file-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: UploadComponent,
			multi: true
		}
	]
})
export class UploadComponent implements ControlValueAccessor {
	onChange!: Function;
	public file: File | null = null;
	@Output() fileNameChange = new EventEmitter<string>();

	@HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
		const file = event && event.item(0);
		this.onChange(file);
		this.file = file;

		// Emit the file name to the parent component
		this.fileNameChange.emit(file?.name || '');
	}

	constructor(private host: ElementRef<HTMLInputElement>) {
	}

	writeValue(value: null) {
		// clear file input
		this.host.nativeElement.value = '';
		this.file = null;
	}

	registerOnChange(fn: Function) {
		this.onChange = fn;
	}

	registerOnTouched(fn: Function) {
	}
}