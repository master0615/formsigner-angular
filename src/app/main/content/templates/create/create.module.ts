import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { TemplatesCreateComponent } from './create.component';
import { PdfHandlerService } from '../../services/pdf-handler.service';



@NgModule({
    declarations   : [
        TemplatesCreateComponent
    ],
    imports        : [
        CommonModule,
        SharedModule
    ],
    exports        : [

    ],
    entryComponents: [
    ],
    providers:[PdfHandlerService]
})

export class TemplatesCreateModule{
}
