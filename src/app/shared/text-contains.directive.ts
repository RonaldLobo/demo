import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
	selector: '[text-contains-validator]',
	providers: [
	{
		provide: NG_VALIDATORS,
		useExisting: forwardRef(() => TextContainsValidator ),
		multi: true
	}
	]
})
export class TextContainsValidator implements Validator {
	@Input('text-contains-validator') param:string; 
	validate(control: AbstractControl) {
		let text = control.value;
		if (text && text.indexOf(this.param) == -1) {
			return {
				textContains: {
					textContains: this.param
				}
			}
		} else {
			return null;
		}
	}
}