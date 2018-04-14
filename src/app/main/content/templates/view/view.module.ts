import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { TemplatesViewComponent } from './view.component';
import { TemplateService } from '../../services/template.service';
import { TemplatesViewContentComponent } from './content/content.component';
import { TemplatesViewFieldComponent } from './field/field.component';
import { TemplatesViewPropertyComponent } from './property/property.component';
import { PdfGenerationService } from '../../services/pdf-generation.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [
		TemplatesViewComponent
	],
	declarations: [
		TemplatesViewComponent,
		TemplatesViewContentComponent,
		TemplatesViewFieldComponent,
		TemplatesViewPropertyComponent
	],
	providers:[TemplateService, PdfGenerationService]
})
export class TemplatesViewModule { }


