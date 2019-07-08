import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { includes } from 'lodash';

export default function tagsValidator(allowedTags): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return includes(allowedTags, control.value)
      ? null
      : { valid: false };
  };
}
