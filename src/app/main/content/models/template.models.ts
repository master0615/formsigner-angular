import * as _ from 'lodash';
export enum DocumentType{
    PDF = 'pdf',
    DOC = 'doc',
    IMG = 'img'
}
export const DOCUMENT_TYPES:any[]=[
    {value: DocumentType.PDF, label: 'PDF File'},
    {value: DocumentType.DOC, label: 'DOC File'},
    {value: DocumentType.IMG, label: 'IMAGE File'} 
]
export enum FormFieldGroupType{
    DATA = 'data',
    SIGN = 'sign'
}

export const FORM_FIELD_GROUP_TYPES:any[]=[
    {value: FormFieldGroupType.DATA, label: 'Data Entry Fields'},
    {value: FormFieldGroupType.SIGN, label: 'Signature Fields'},
]

export enum FormFieldType {
    DATA_TEXT       = 'data_text',
    DATA_TEXT_BOX   = 'data_text_box',
    DATA_DATE       = 'data_date',
    DATA_CHECK_BOX  = 'data_check_box',
    DATA_RADIO      = 'data_radio',
    DATA_SELECT     = 'data_select',
    SIGN_DRAW       = 'sign_draw',
    SIGN_INITIAL    = 'sign_initial',
    SIGN_NAME       = 'sign_name',
    SIGN_DATE       = 'sign_date',
    SIGN_EMAIL      = 'sign_email'    
}

export const FORM_FIELD_TYPES: any[] = [
    { value: FormFieldType.DATA_TEXT,       label: 'Text Field',        icon:'text_fields',                group_id: 'data',  tooltip: 'Drag and drop this field to allow the user to provide text or numeric information at a desired location on this document.' },
    { value: FormFieldType.DATA_TEXT_BOX,   label: 'Text Box',          icon:'short_text',                 group_id: 'data',  tooltip: 'Drag and drop this field to allow the user to provide more than one line of text or numeric information at a desired location on this document.'},
    { value: FormFieldType.DATA_DATE,       label: 'Date Field',        icon:'today',                      group_id: 'data',  tooltip: 'Drag and drop this field to allow the user to provide date information at a desired location on this document. User can select and assign the date formats in the dropdown from the properties on the right side.' }, 
    { value: FormFieldType.DATA_CHECK_BOX,  label: 'Checkbox Field',    icon:'check_box',                  group_id: 'data',  tooltip: 'Drag and drop this field to allow the user to provide checkbox type of information at a desired location on this document. If you want only one of the checkboxes to be selected, you can select and assign the checkboxes to a checkbox group in the properties section on the right side.' }, 
    { value: FormFieldType.DATA_RADIO,      label: 'Radio Field',       icon:'radio_button_checked',       group_id: 'data',  tooltip: 'Drag and drop this field to allow the user to provide radio button type of information at a desired location on this document. You can select and assign the radio buttons to a group in the properties section on the right side. Only one radio button from a group can be selected.' }, 
    { value: FormFieldType.DATA_SELECT,     label: 'Dropdown Field',    icon:'arrow_drop_down_circle',     group_id: 'data',  tooltip: 'Drag and drop this field to allow the user to choose a single option from a list of multiple options' }, 
    { value: FormFieldType.SIGN_DRAW,       label: 'Signature Field',   icon:'fingerprint',                group_id: 'sign',  tooltip: 'Drag and drop the sign field to capture the signatures electronically at a desired location on this document.' }, 
    { value: FormFieldType.SIGN_INITIAL,    label: 'Initials Field',    icon:'border_color',               group_id: 'sign',  tooltip: 'Drag and drop the initials field to capture the signers initials electronically at a desired location on this document.'}, 
    { value: FormFieldType.SIGN_NAME,       label: 'Signer Name',       icon:'perm_identity',              group_id: 'sign',  tooltip: 'Drag and drop this field to allow the signer to provide his/her name at a desired location on this document. This name will automatically be populated as the name of the signer provided by the sender.'}, 
    { value: FormFieldType.SIGN_DATE,       label: 'Date Signed',       icon:'event_available',            group_id: 'sign',  tooltip: 'Drag and drop this field to allow the signer to capture the date of signing at a desired location on this document. This date will automatically be populated as current date at the time of signing.'}, 
    { value: FormFieldType.SIGN_EMAIL,      label: 'Signer Email',      icon:'mail',                       group_id: 'sign',  tooltip: 'Drag and drop this field to allow the signer to capture his/her email at a desired location on this document. This email will automatically be populated as the email address of the signer provided by the sender.'},             
];
export const DEAFULT_DATE_FORMAT="M/D/YYYY";
export const DATETIME_FORMATS:any[] = [
    'M D YYYY',
    'MM DD YYYY',
    'MMM DD YYYY',
    'MMMM DD YYYY',
    'D M YYYY',
    'DD MM YYYY',
    'DD MMM YYYY',
    'DD MMMM YYYY',
    'M-D-YYYY',
    'MM-DD-YYYY',
    'MMM-DD-YYYY',
    'MMMM-DD-YYYY',
    'D-M-YYYY',
    'DD-MM-YYYY',
    'DD-MMM-YYYY',
    'DD-MMMM-YYYY',
    'M/D/YYYY',
    'MM/DD/YYYY',
    'MMM/DD/YYYY',
    'MMMM/DD/YYYY',
    'D/M/YYYY',
    'DD/MM/YYYY',
    'DD/MMM/YYYY',
    'DD/MMMM/YYYY',
    'M D YY',    
    'MM DD YY',
    'MMM DD YY',
    'MMMM DD YY',
    'D M YY',
    'DD MM YY',
    'DD MMM YY',
    'DD MMMM YY',
    'M-D-YY',
    'MM-DD-YY',
    'MMM-DD-YY',
    'MMMM-DD-YY',
    'D-M-YY',    
    'DD-MM-YY',
    'DD-MMM-YY',
    'DD-MMMM-YY',
    'M/D/YY',
    'MM/DD/YY',
    'MMM/DD/YY',
    'MMMM/DD/YY',
    'D/M/YY',
    'DD/MM/YY',
    'DD/MMM/YY',
    'DD/MMMM/YY',
    'M D YYYY HH:mm',   
    'MM DD YYYY HH:mm',
    'MMM DD YYYY HH:mm',
    'MMMM DD YYYY HH:mm',
    'D M YYYY HH:mm',     
    'DD MM YYYY HH:mm',
    'DD MMM YYYY HH:mm',
    'DD MMMM YYYY HH:mm',
    'M-D-YYYY HH:mm',
    'MM-DD-YYYY HH:mm',
    'MMM-DD-YYYY HH:mm',
    'MMMM-DD-YYYY HH:mm',
    'D-M-YYYY HH:mm',
    'DD-MM-YYYY HH:mm',
    'DD-MMM-YYYY HH:mm',
    'DD-MMMM-YYYY HH:mm',
    'M/D/YYYY HH:mm',
    'MM/DD/YYYY HH:mm',
    'MMM/DD/YYYY HH:mm',
    'MMMM/DD/YYYY HH:mm',
    'D/M/YYYY HH:mm',
    'DD/MM/YYYY HH:mm',
    'DD/MMM/YYYY HH:mm',
    'DD/MMMM/YYYY HH:mm',
    'M D YY HH:mm',
    'MM DD YY HH:mm',
    'MMM DD YY HH:mm',
    'MMMM DD YY HH:mm',
    'D M YY HH:mm',
    'DD MM YY HH:mm',
    'DD MMM YY HH:mm',
    'DD MMMM YY HH:mm',
    'M-D-YY HH:mm',
    'MM-DD-YY HH:mm',
    'MMM-DD-YY HH:mm',
    'MMMM-DD-YY HH:mm',
    'D-M-Y HH:mm',
    'DD-MM-YY HH:mm',
    'DD-MMM-YY HH:mm',
    'DD-MMMM-YY HH:mm',
    'M/D/YY HH:mm',
    'MM/DD/YY HH:mm',
    'MMM/DD/YY HH:mm',
    'MMMM/DD/YY HH:mm',
    'D/M/YY HH:mm',
    'DD/MM/YY HH:mm',
    'DD/MMM/YY HH:mm',
    'DD/MMMM/YY HH:mm'
];



export class TemplateForm {
    id: number;
    name: string;
    icon: string;
    description: string;
    pages: number;
    share_all: boolean;
    user_id: number;
    create_at: string;
    updated_at: string;
    user_name?: string;
    thumb?: string;
    files?:TemplateFormFile[];
    checkbox_groups?: string[];
    radio_groups?: string[];
    constructor(template) {
        //this.id = template.id || 0;
        this.name = template.name || '';
        this.icon = template.icon || 'insert drive file';
        this.description = template.description || '';
        this.share_all = template.share_all || false;
        this.pages = template.pages || 1;
        this.user_id = template.user_id || 0;
    }    
}

export class TemplateFormFile{
    id: number;
    name: string;
    ext: string;
    form_id: number;
    page_number: number;
    file_width: number;
    file_height: number;
    filename: string;
    fields?:TemplateFormField[];
    screen_width?: number;
    screen_height?: number;
    path?: string;
    img_data?: any;
    constructor(templateFile) {
        //this.id = templateFile.id || 0;
        this.name = templateFile.name || '';
        this.ext = templateFile.ext || '';
        this.form_id = templateFile.form_id || '';
        this.page_number = templateFile.number || 1;
        this.file_width = templateFile.file_width || 2475;
        this.file_height = templateFile.file_height || 3525; 
        this.filename = templateFile.filename || '';
    }     
}

export class TemplateFormField{
    id: number;
    name: string;
    description: string;
    value: any;    
    type: FormFieldType;
    file_id: number;
    page_number: number;
    x_rate: number;
    y_rate: number;
    width_rate: number;
    height_rate: number;
    is_mandatory: boolean;
    length?: number;
    group?: string;
    is_only_check_group?: boolean;
    date_format?: string;
    select_options?: string;
    meta_info?: any;
    widget_config?: any;
    sign_path?: string;
    sign?: any;
    initial?: any;   
    img_data?: any;
    dragged?: boolean;
    resized?: boolean;
    constructor(templateField) {
        //this.id = templateField.id || 0;
        this.name = templateField.name || '';
        this.type = templateField.type || FormFieldType.DATA_TEXT;
        this.file_id = templateField.file_id || 0;
        this.value = templateField.value || '';
        this.page_number = templateField.page_number || 1;
        this.x_rate = templateField.x_rate || 0;
        this.y_rate = templateField.y_rate || 0;
        this.width_rate = templateField.width_rate || 0;
        this.height_rate = templateField.height_rate || 0;
        this.is_mandatory = templateField.is_mandatory || false;
        this.description = templateField.description || '';
        this.dragged = templateField.dragged || false;
        this.resized = templateField.resized || false;

        if ( this.type == FormFieldType.DATA_TEXT ) {
            this.length = templateField.length || 8;
        } else if ( this.type == FormFieldType.DATA_TEXT_BOX ) {
            this.length = templateField.length || 200;
        }

        if (this.type == FormFieldType.DATA_CHECK_BOX || this.type == FormFieldType.DATA_RADIO ) {
            this.group = templateField.group || '';
            this.value = templateField.value || '0';
        }

        if ( this.type == FormFieldType.DATA_CHECK_BOX ) {
            this.is_only_check_group = templateField.is_only_check_group || 0;
            this.value = templateField.value || false;
        }

        if ( this.type == FormFieldType.DATA_DATE || this.type == FormFieldType.SIGN_DATE ) {
            this.date_format = templateField.date_format || DEAFULT_DATE_FORMAT;
        }

        if ( this.type == FormFieldType.DATA_SELECT ) {
            this.select_options = templateField.select_options || '';
        }

        if ( this.type == FormFieldType.SIGN_NAME) {
            this.name = "Signer Name";
        }
        if ( this.type == FormFieldType.SIGN_EMAIL) {
            this.name = "Signer Email";
        }
        if (this.type == FormFieldType.SIGN_DATE) {
            this.name = "Date Signed";
        }

        if (this.type == FormFieldType.SIGN_DRAW || this.type == FormFieldType.SIGN_INITIAL) {
            this.is_mandatory = true;
        }
    }       
}