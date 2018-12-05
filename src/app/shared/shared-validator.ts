import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import {of, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

export class SharedValidator {

    static rangeValidator(minValue: number, maxValue: number): ValidatorFn {
        return (c: AbstractControl) => {
            const controlValue = +c.value;
            if ( Number.isNaN(controlValue)) {
                return { 'range': false};
            }

            if (controlValue < minValue || controlValue > maxValue) {
                return { 'range': { minValue, maxValue, controlValue}};
            }

            return null;
        };
    }

    static productCodeValidator(control: AbstractControl): Observable<{[key: string]: any}> {
        const value = control.value;
        return of({
            'productCodeValidator': true
        })
        .pipe(
            delay(1000)
        );
    }
}

