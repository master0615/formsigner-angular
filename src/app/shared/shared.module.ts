import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileDropModule } from 'ngx-file-drop';

import { ConfirmDialogComponent } from './dialog/confirm/confirm-dialog.component';

import { NgDraggableWidgetModule } from './draggableModule/main';
import { WINDOW_PROVIDERS } from './services/window-service';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MatchHeightDirective } from './directives/match-height.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ShowErrorsComponent } from './validators/show-errors/show-errors.component';
import { LightboxModule } from 'angular2-lightbox';
import { DisableControlDirective } from './directives/disable-control.directive';

@NgModule({
    declarations   : [
        ConfirmDialogComponent,
        ShowErrorsComponent,
        MatchHeightDirective,
        DisableControlDirective
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDatatableModule,
        NgSelectModule,
        NgxDnDModule,        
        FileDropModule,
        NgDraggableWidgetModule,
        ContextMenuModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        SignaturePadModule,
        LightboxModule 
    ],
    exports        : [
        MatchHeightDirective,
        DisableControlDirective,
        
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDatatableModule,
        NgSelectModule,
        TranslateModule,
        NgxDnDModule,
        NgDraggableWidgetModule,
        ContextMenuModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        SignaturePadModule,
        ShowErrorsComponent
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    providers      : [
        WINDOW_PROVIDERS
    ]
})

export class SharedModule{
}
