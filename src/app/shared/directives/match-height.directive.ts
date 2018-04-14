import {
    Directive, ElementRef, AfterViewChecked, 
    Input, HostListener,EventEmitter, AfterViewInit
} from '@angular/core';

@Directive({
    selector: '[matchHeight]',
    outputs: ['OnResizeElement']
})
export class MatchHeightDirective implements AfterViewInit, AfterViewChecked {
    // class name to match height
    @Input()
    matchHeight: string;

    private parentHeight:number;
    private parentWeight:number;
    private odlMaxHeight = 0;
    OnResizeElement = new EventEmitter();

    @HostListener('window:resize') 
    onResize() {
        // call our matchHeight function here
        this.setMatchHeight(this.el.nativeElement, this.matchHeight);
        //this.OnResizeElement.emit({width: this.parentWeight, height: this.parentHeight});
    }

    constructor(private el: ElementRef) {
        this.onResize();
    }
    ngAfterViewInit() {
        this.setMatchHeight(this.el.nativeElement, this.matchHeight);
          
    }
    ngAfterViewChecked() {
        // call our matchHeight function here later
        if (this.odlMaxHeight == 0 ){
            this.setMatchHeight(this.el.nativeElement, this.matchHeight);
        }
    }

    setMatchHeight(parent: HTMLElement, className: string) {
        // match height logic 
        if (!parent) return;
        
        // step 1: find all the child elements with the selected class name
        const children = parent.getElementsByClassName(className);

        if (!children) return;

        // reset all children height
        Array.from(children).forEach((x: HTMLElement) => {
            x.style.height = 'initial';
        })
        // step 2a: get all the child elements heights
        const itemHeights = Array.from(children)
            .map(x => x.getBoundingClientRect().height);

        // step 2b: find out the tallest
        const maxHeight = itemHeights.reduce((prev, curr) => {
            return curr > prev ? curr : prev;
        }, 0);

        
        // step 3: update all the child elements to the tallest height
        if (maxHeight == 0) return;
        this.odlMaxHeight = maxHeight;
        Array.from(children)
            .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);

        // step4 update parentDiv
        parent.style.height = `${maxHeight}px`;
        this.parentHeight = parent.getBoundingClientRect().height;
        this.parentWeight = parent.getBoundingClientRect().width;
        this.OnResizeElement.emit({width: this.parentWeight, height: this.parentHeight});     
    }
}   