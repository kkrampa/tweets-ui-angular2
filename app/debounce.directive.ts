import { Directive, ElementRef, Renderer, forwardRef } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive(
    {selector: '[debounce]', providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DebounceDirective),
      multi: true
    }
  ]}
)
export class DebounceDirective implements ControlValueAccessor {
    onChange = (_) => {};
    onTouched = () => {};

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngAfterViewInit() {
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .debounceTime(1000)
            .subscribe((event) => {
                console.log('event');
                this.onChange(event.target.value);
            })
    }

    writeValue(value: any): void {
        var normalizedValue = value ? '' : value;
        this.renderer.setElementProperty(this.el.nativeElement, 'value', normalizedValue);
    }

    registerOnChange(fn: () => any): void { this.onChange = fn; }
    registerOnTouched(fn: () => any): void { this.onTouched = fn; }
}
