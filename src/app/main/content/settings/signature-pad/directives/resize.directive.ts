import {
    Directive, ElementRef, AfterViewChecked, 
    Input, HostListener,EventEmitter, AfterViewInit
} from '@angular/core';

@Directive({
    selector: '[resize]',
    outputs: ['onResizeElement']
})
export class MatchResizeDirective implements AfterViewInit, AfterViewChecked {
    // class name to match height
    onResizeElement = new EventEmitter();

    @HostListener('window:resize') 
    onResize() {
        // call our matchHeight function here
        let parentHeight = this.el.nativeElement.getBoundingClientRect().height;
        let parentWeight = this.el.nativeElement.getBoundingClientRect().width;

        this.onResizeElement.emit({width: parentHeight, height: parentHeight});    
    }

    constructor(private el: ElementRef) {
        this.onResize();
    }
    ngAfterViewInit() {
        this.onResize();
    }
    ngAfterViewChecked() {

    }
}   