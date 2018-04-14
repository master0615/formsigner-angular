import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
import * as domtoimage from 'dom-to-image';
import { SettingsService } from './settings.service';
import { TemplateService } from './template.service';
import { TemplateForm, FormFieldType } from '../models/template.models';
import * as _ from 'lodash';
import * as moment from 'moment';

const PDF_WIDTH = 210;
const PDF_HEIGHT = 297;
const BASE64_MARKER = ';base64,';

@Injectable()
export class PdfGenerationService {

    constructor(
        private settingsService: SettingsService,
        private templateService: TemplateService) {

    }

    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        document.body.removeChild(canvas);
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    //Call it like this :  getBase64FromImageUrl("images/slbltxt.png")
    getImageFromUrl = function(url, callback?) {
        var img = new Image, data, ret={data: null, pending: true};
        img.setAttribute('crossOrigin', 'anonymous');
        img.onerror = function() {
            throw new Error('Cannot load image: "'+url+'"');
        }
        img.onload = function() {
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.width = img.width;
            canvas.height = img.height;
    
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Grab the image as a jpeg encoded in base64, but only the data
            var dataURL = canvas.toDataURL("image/png");
    
            data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

            // Convert the data to binary form
            data = atob(data);
            document.body.removeChild(canvas);
                        
            ret['data'] = data;
            ret['pending'] = false;

            if (typeof callback === 'function') {
                callback(data);
            }
        }
        img.src = url;
    
        return ret;
    }
    
    convertDomToImage(node) {
        domtoimage.toPng(node).then(
            dataUrl => {
            let img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
        })
        .catch(error=> {
            console.error('oops, something went wrong!', error);
        });    
    }

	setStringAsDateFormat(value: string, dateFormat: string) {
		if (!value){
			return '';
		}else if (dateFormat.trim() == ''){
			return value;
		}
		let result = moment(value).format(dateFormat).toString();
		return result;
    }
    
    generatePdfFromTemplateForm(templateForm: TemplateForm, fontSize:number = 14, isSave = true) {
        var doc = new jsPDF();

        doc.setProperties({
            title: templateForm.name,
            subject: templateForm.description,		
            author: templateForm.user_name,
            keywords: 'generated, formsigner, web 2.0, ajax',
            creator: 'MEEE'
        });
        doc.setFontSize(fontSize);
        doc.setFont('courier');
        doc.setFontType('normal');

        let file_index = 0;
        _.sortBy(templateForm.files, 'page_number');

        templateForm.files.forEach(file => {
            //doc.addHTML(0, 0, );
            if (file_index != 0){
                doc.addPage();
                doc.setPage(file.page_number);
            } 
            file_index++;
            let file_size_rate = file.file_width / file.file_height;
            let pdf_size_rate = PDF_WIDTH / PDF_HEIGHT;

            let page_width =  PDF_WIDTH;
            let page_height = PDF_HEIGHT;

            if ( file_size_rate > pdf_size_rate ) {
                page_height = page_width / file_size_rate;
            } else {
                page_width = page_height * file_size_rate;
            }

            if ( file.img_data.pending == false ) {
                doc.addImage(file.img_data.data, 'JPG', 0, 0, page_width, page_height);
            }

            let lineWidth = 0.7;
            file.fields.forEach ( field => {
                switch (field.type) {
                    case FormFieldType.DATA_TEXT:
                    case FormFieldType.DATA_SELECT:
                    case FormFieldType.SIGN_EMAIL:
                    case FormFieldType.SIGN_NAME:
                        var splitTitle = doc.splitTextToSize(field.value, field.width_rate * page_width );
                        doc.text(field.x_rate * page_width,
                            ( field.y_rate + field.height_rate / 2 ) * page_height + 1,
                            field.value);
                        break;
                    case FormFieldType.DATA_DATE:
                    case FormFieldType.SIGN_DATE:
                        var splitTitle = doc.splitTextToSize(field.value, field.width_rate * page_width );
                        doc.text(field.x_rate * page_width,
                            ( field.y_rate + field.height_rate / 2 ) * page_height + 1,
                            this.setStringAsDateFormat(field.value, field.date_format));
                            break;
                    case FormFieldType.DATA_TEXT_BOX:
                        var splitTitle = doc.splitTextToSize(field.value, field.width_rate * page_width );
                        doc.text(field.x_rate * page_width, 
                                field.y_rate * page_height + 2, 
                                field.value);
                        break;
                    case FormFieldType.DATA_CHECK_BOX:
                        doc.setDrawColor(0);
                        doc.setLineWidth(lineWidth);
                        doc.setFillColor(255,255,255);
                        
                        doc.rect( field.x_rate * page_width, 
                                field.y_rate * page_height,
                                field.width_rate * page_width - lineWidth,
                                field.height_rate * page_height - lineWidth,'FD');

                        if ( parseInt(field.value) || field.value == true ){
                            doc.setFillColor(0);
                            doc.line((field.x_rate + field.width_rate / 8) * page_width , 
                                    (field.y_rate + field.height_rate / 2) * page_height,
                                    (field.x_rate + field.width_rate * 3 / 8) * page_width,
                                    (field.y_rate + field.height_rate * 7 / 8) * page_height - 2 * lineWidth);

                            doc.line((field.x_rate + field.width_rate * 3 / 8) * page_width ,
                                    (field.y_rate + field.height_rate * 7 / 8) * page_height - 2 * lineWidth,
                                    (field.x_rate + field.width_rate * 7 / 8) * page_width - lineWidth  ,
                                    (field.y_rate + field.height_rate / 4 ) * page_height - lineWidth);                                    
                        }

                        break;
                    case FormFieldType.DATA_RADIO:
                        doc.setDrawColor(0);
                        doc.setLineWidth(lineWidth);

                        doc.setFillColor(255,255,255);
                        doc.ellipse( (field.x_rate + field.width_rate / 2) * page_width, 
                                    (field.y_rate + field.height_rate / 2) * page_height,
                                    field.width_rate / 2 * page_width- lineWidth,
                                    field.height_rate  / 2 * page_height - lineWidth, 'FD');


                        if ( parseInt(field.value) ){
                            doc.setFillColor(0);
                            doc.ellipse((field.x_rate + field.width_rate / 2) * page_width, 
                                        (field.y_rate + field.height_rate / 2) * page_height,
                                        field.width_rate / 4 * page_width - lineWidth,
                                        field.height_rate / 4 * page_height - lineWidth, 'F');
                        }

                        break;
                    case FormFieldType.SIGN_DRAW:
                    case FormFieldType.SIGN_INITIAL:
                        if ( field.img_data && field.img_data.pending == false ) {
                            doc.addImage( 
                                field.img_data.data, 
                                'PNG', 
                                field.x_rate * page_width, 
                                field.y_rate * page_height,
                                field.width_rate * page_width,
                                field.height_rate* page_height);
                        }
                        break;
                }
            });
        });
        // Save the PDF
        if (isSave) {
            doc.save(templateForm.name + ".pdf");
            return null;
        }

        return doc.output('datauristring');
        //return doc.output('blob');
    }

}