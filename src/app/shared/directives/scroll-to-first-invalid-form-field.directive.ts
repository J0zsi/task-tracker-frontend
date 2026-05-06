import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appScrollToFirstInvalidFormField]',
})
export class ScrollToFirstInvalidFormField {
  private readonly elementRef = inject(ElementRef);

  @HostListener('ngSubmit')
  onSubmit(): void {
    this.scrollToFirstInvalidField();
  }

  private scrollToFirstInvalidField(): void {
    const invalidField = this.elementRef.nativeElement.querySelector('.ng-invalid');

    if (!invalidField) {
      return;
    }

    invalidField.scrollIntoView({
      block: 'center',
    });

    invalidField.focus();
  }
}
