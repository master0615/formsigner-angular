import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesFileUploadDialogComponent } from './file-upload-dialog.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { PdfHandlerService } from '../../../services/pdf-handler.service';

@NgModule({
    declarations   : [
        TemplatesFileUploadDialogComponent,

    ],
    imports        : [
        CommonModule,
        SharedModule
    ],
    exports        : [

    ],
    entryComponents: [
        TemplatesFileUploadDialogComponent
    ],
    providers:[PdfHandlerService]
})

export class TemplatesFileUploadDialogModule{
}
