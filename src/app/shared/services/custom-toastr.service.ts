import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomToastrService {

    constructor(private toastrService: ToastrService) {
    }

    showSuccess( msg:string, title = 'Success!' ) {
			this.toastrService.success(msg, title);
		}
    
		showError( msg:string, title = 'Error!' ) {
			this.toastrService.error(msg, title);
		}

		showInfo( msg:string, title = 'Info!' ) {
			this.toastrService.info(msg, title);
		}
		
		showWarning( msg:string, title = 'Warning!' ) {
			this.toastrService.warning(msg, title);
		}
		
		showErrorMsg( err, title = 'Error!' ){
			let errMsg:string = '';
			
			if (typeof err === 'object') {
				Object.keys( err ).forEach( field =>{
					errMsg += err[field] + "\n";
				});
			}else{
			  	errMsg = err;
			}

			this.toastrService.error( errMsg, title);
  
		}
}