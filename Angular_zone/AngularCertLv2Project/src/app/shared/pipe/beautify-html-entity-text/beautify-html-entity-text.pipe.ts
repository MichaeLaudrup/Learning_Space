import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyHTMLEntityText',
  standalone: true
})
export class BeautifyHTMLEntityTextPipe implements PipeTransform {

  transform(textWithHTMLEntities: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = textWithHTMLEntities;
    return textarea.value;
  }

}
