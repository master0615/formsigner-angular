// tslint:disable:quotemark
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgWidgetContainer } from '../directives/NgWidgetContainer';
import { NgWidget } from '../directives/NgWidget';
import { NgWidgetPlaceholder } from '../components/NgWidgetPlaceholder';
//import { NgWidgetContainer, NgWidget, INgWidgetConfig, INgWidgetEvent, NgWidgetPlaceholder } from '../main';

@NgModule({
  declarations:     [ NgWidgetContainer, NgWidget, NgWidgetPlaceholder ],
  entryComponents:  [ NgWidgetPlaceholder ],
  exports:          [ NgWidgetContainer, NgWidget ]
})
export class NgDraggableWidgetModule {}