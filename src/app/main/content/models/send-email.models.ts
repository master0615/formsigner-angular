export class SendEmail{
    id: number;
    email: string;
    user_id: number;

    constructor(sendEmail) {
        this.email = sendEmail.email || '';
        this.user_id = sendEmail.user_id || 0;
    }  
}