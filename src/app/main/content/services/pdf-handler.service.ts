import {Injectable} from '@angular/core';
//import { PDFJS } from 'pdfjs-dist'
//declare let PDFJS: any;
export var PDFJS = require('pdfjs-dist');
const BASE64_MARKER = ';base64,';

@Injectable()
export class PdfHandlerService {

    constructor() {
    }


    convertDataURIToBinary(dataURI) {
        var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = dataURI.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
    
        for(var i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    createPdfFromDatauri(pdfAsDataUri) {
        return new Promise((resolve, reject) => {
            let pdfAsArray = this.convertDataURIToBinary(pdfAsDataUri);
            //debugger; 
            PDFJS.getDocument(pdfAsArray).then((_pdfDoc) => {
                resolve(_pdfDoc);
            }, (error) => {
                reject(error);
            });
        });
    }

    setPdfDocObjects(pdfAsDataUri) {
        return new Promise((resolve, reject) => {
            let pdfAsArray = this.convertDataURIToBinary(pdfAsDataUri);
            //debugger; 
            PDFJS.getDocument(pdfAsArray).then((_pdfDoc) => {

                resolve(this.renderPdfToImages(_pdfDoc));
            }, (error) => {
                reject(error);
            });
        });

    }
  
    renderPdfToImages(pdf) {
        let pdfImages:any[]=[];
        let allPagesPromises = [];
        let arr = [];
        for (let i = 1; i <= pdf.numPages ; i++) {
            arr.push(i);
        }

        return arr.reduce((promise, pageNum) => {
            return promise.then((result) => {
                // help you to understand what's result
                return pdf.getPage(pageNum).then(page => {

                    let scale = 2;
                    let viewport = page.getViewport(scale);

                    let canvas = document.createElement('canvas');
                    canvas.style.display = "none";
                    let context = canvas.getContext('2d');
                    document.body.appendChild(canvas);
                    //
                    // Prepare canvas using PDF page dimensions
                    //
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    //
                    // Render PDF page into canvas context
                    //
                    let task = page.render({canvasContext: context, viewport: viewport});

                    return task.then( () => {
                        let pdfImage :any={};
                            pdfImage.src = canvas.toDataURL('image/jpeg');
                            pdfImage.width = viewport.width;
                            pdfImage.height = viewport.height;
                            pdfImage.pageNum = pageNum;
                            document.body.removeChild(canvas);
                            
                            pdfImages.push(pdfImage);

                            return pdfImages;
                        });
                })

            }).catch(console.error)
          }, Promise.resolve(pdfImages));
    }

    
    b64toFile(dataURI, fileName: string): File {
        // convert the data URL to a byte string
        const byteString = atob(dataURI.split(',')[1]);

        // pull out the mime type from the data URL
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        
        // Convert to byte array
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // Create a blob that looks like a file.
        const blob = new Blob([ab], { 'type': mimeString });
        blob['lastModifiedDate'] = (new Date()).toISOString();
        blob['name'] = fileName;
            
        // Figure out what extension the file should have
        switch(blob.type) {
            case 'image/jpeg':
                blob['name'] += '.jpg';
                break;
            case 'image/png':
                blob['name'] += '.png';
                break;
            case 'application/pdf':
                blob['name'] += '.pdf';
                break;
        }
        // cast to a File
        return <File>blob;
    }
}   