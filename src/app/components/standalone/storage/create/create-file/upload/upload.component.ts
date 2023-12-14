import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'storage-create-file-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
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
	@Input() progress: any;

	onChange!: Function;
	public file: File | null = null;

	@HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
		const file = event && event.item(0);
		this.onChange(file);
		this.file = file;
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