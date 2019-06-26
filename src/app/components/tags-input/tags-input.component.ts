import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { includes } from 'lodash';

const allowedTagsArray: string[] = [
  'JavaScript',
  'Angular',
  'Lohika',
  'iqos'
];

function tagsValidator(allowedTags): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return includes(allowedTags, control.value)
      ? null
      : { valid: false };
  };
}

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent {
  private profileForm: FormGroup = this.fb.group({
    tags: [
      '', [
        Validators.minLength(2),
        Validators.required,
        tagsValidator(allowedTagsArray)
    ]]
  });

  tags: string[] = [];

  onSubmit(): void {
    const tag = this.profileForm.value.tags;
    this.tags.push(tag);
    this.profileForm.setValue({ tags: ''});
  }

  constructor(private fb: FormBuilder) { }
}
