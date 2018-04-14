import { Component, 
		OnInit, 
		Input, 
		ViewChild, 
		ViewEncapsulation, 
		HostListener, 
		Output, 
		EventEmitter, 	
		AfterViewInit, 
		OnChanges,
		SimpleChanges,
		ChangeDetectorRef} from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
	selector: 'app-settings-signature-pad',
	templateUrl: './signature-pad.component.html',
	styleUrls: ['./signature-pad.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SettingsSignaturePadComponent implements OnInit, OnChanges {
	
	signaturePadOptions: Object = {
		'minWidth': 3,
		'canvasWidth': 400,
		'canvasHeight': 200
	};

	@Input() title;
	@Input() signdata;

	@Output() onSaveSign = new EventEmitter();

	differ: any;

	@ViewChild(SignaturePad) signaturePad: SignaturePad;

	color: string="#000000";
	penWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	penWidth = 1;
	imgSrc;
	
	constructor(private cdRef: ChangeDetectorRef) { 
	}

	ngOnInit() {

	}

	ngOnChanges(changes: SimpleChanges) {

		if (changes.signdata && this.signdata) {
			if ( this.signdata && this.signdata.data ) 
				this.signaturePad.fromData(JSON.parse(this.signdata.data));
			let newPath = this.signdata.path;
			//this.signdata.path = "";
			//setTimeout(()=>this.signdata.path = ""); 
			//setTimeout(()=>this.signdata.path = newPath); 
			this.cdRef.detectChanges();
		}
	}

	drawSignStart() {

	}
	
	drawSignComplete() {

	}

	resizeSignature(event){

		let width = event.width;
		let height = event.height;
		this.signaturePad.set('canvasWidth', width);
		//this.signaturePad.set('canvasHeight', width/2);
	}

	onChangeWidth(width: number) {
		this.signaturePad.set('maxWidth', width);
		this.signaturePad.set('velocityFilterWeight', 0.05);
	}

	changeColor(color: string) {
		this.signaturePad.set('penColor', color);
	}
	
	clear() {
		this.signaturePad.clear();
	}

	undo() {
		var data = this.signaturePad.toData();
		if (data) {
		  data.pop(); // remove the last dot or line
		  this.signaturePad.fromData(data);
		}
	}

	save() {
		let signData = JSON.stringify( this.signaturePad.toData() );
		let signImgData =  this.signaturePad.toDataURL();
		this.imgSrc = signImgData;
		this.onSaveSign.next({data: signData, file: signImgData});
	}
}
