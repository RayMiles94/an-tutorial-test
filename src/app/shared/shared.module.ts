import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinngComponet } from './loading-spinner/loading-spining.component';
import { PlacerHolderDirective } from './placerholder/placeholder.directive';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinngComponet,
        PlacerHolderDirective,
        DropDownDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AlertComponent,
        LoadingSpinngComponet,
        PlacerHolderDirective,
        DropDownDirective,
        CommonModule
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule {}