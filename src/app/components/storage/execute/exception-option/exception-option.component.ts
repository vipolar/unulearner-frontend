import { Component, Input } from '@angular/core';

interface ExceptionOption {
	option: string;
	displayText: string;
	parameters: ExceptionOptionParameter[] | null;
}

interface ExceptionOptionParameter {
	parameter: string;
	displayText: string;
	parameterType: string;
}

@Component({
	selector: 'app-exception-option',
	templateUrl: './exception-option.component.html',
	styleUrl: './exception-option.component.scss',
	standalone: true,
	imports: [],
})
export class ExceptionOptionComponent {
	@Input() exceptionOption!: ExceptionOption;
}
