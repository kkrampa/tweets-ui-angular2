import { Directive, ElementRef, Renderer, forwardRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive(
    {selector: '[appDebounce]', providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DebounceDirective),
      multi: true
    }
  ]}
)
export class DebounceDirective implements ControlValueAccessor, AfterViewInit {
    onChange = (_) => {};
    onTouched = () => {};

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngAfterViewInit() {
        Observable.fromEvent(this.el.nativeElement, 'input')
            .debounceTime(1000)
            .subscribe((event: any) => {
                this.onChange(event.target.value);
            });
    }

    writeValue(value: any): void {
        const normalizedValue = value ? '' : value;
        this.renderer.setElementProperty(this.el.nativeElement, 'value', normalizedValue);
    }

    registerOnChange(fn: () => any): void { this.onChange = fn; }
    registerOnTouched(fn: () => any): void { this.onTouched = fn; }
}
