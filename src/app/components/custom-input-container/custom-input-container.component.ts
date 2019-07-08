import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllowedTags } from '../../constants/tags';
import tagsValidator from '../../validators/tagsValidator';
import { includes } from 'lodash';

@Component({
  selector: 'app-custom-input-container',
  templateUrl: './custom-input-container.component.html',
  styleUrls: ['./custom-input-container.component.scss']
})
export class CustomInputContainerComponent {
  constructor(private fb: FormBuilder) { }

  private tagsInputFormGroup: FormGroup = this.fb.group({
    tags: [
      '', [
        Validators.minLength(2),
        Validators.required,
        tagsValidator(AllowedTags)
      ]]
  });

  public tagsList: string[] = [];
  public allowedTagsArray: string[] = AllowedTags;

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      const tag = this.tagsInputFormGroup.get('tags').value.trim();
      const isAllowedValue = includes(this.allowedTagsArray, tag);
      if (isAllowedValue) {
        this.tagsList.push(tag);
        this.tagsInputFormGroup.reset({ tags: '' });
      }

      return false;
    }
  }
}
