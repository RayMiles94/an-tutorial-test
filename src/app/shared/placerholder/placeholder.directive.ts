import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class PlacerHolderDirective {

    constructor(public viewContainerRef: ViewContainerRef) {}

}