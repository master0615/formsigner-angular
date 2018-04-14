export enum UserRoles {
    ADMIN = 'admin',
    OWNER = 'owner',
    STAFF = 'staff'
}
export const USER_ROLES = [
    {value:UserRoles.ADMIN, label:'Admin'}, 
    {value:UserRoles.OWNER, label:'Owner'}, 
    {value:UserRoles.STAFF, label:'Staff'}
];
export enum UserActives{
    ACTIVE      = 'active',
    INACTIVE    = 'inactive',
    BLOCK       = 'block'
}
export const USER_ACTIVIES = [
    {value:UserActives.ACTIVE,   label:'Active'}, 
    {value:UserActives.INACTIVE, label:'Inactive'}, 
    {value:UserActives.BLOCK,    label:'Block'}
];

export const DefaultProfilePhoto = '/assets/images/user-default.jpg';

export class UserProfile{
    id: number;
    first_name: string;
    last_name: string;
    email:string;
    role: UserRoles;
    active: UserActives;

    password?: string;
    new_password?: string;
    is_set_password?: boolean;
    path?: string;
    thumb?: string;
    created_at: string;
    updated_at: string;
    constructor(userProfile) {
        //this.id = template.id || 0;
        this.first_name = userProfile.first_namename || '';
        this.last_name = userProfile.last_name || 'insert drive file';
        this.email = userProfile.email || '';
        this.role = userProfile.role || UserRoles.STAFF;
        this.active = userProfile.active || UserActives.INACTIVE;
    }  
}


export class UserProfilePhoto{
    id: number;
    name: string;
    ext: string;
    user_id: number;
    path: any;
    thumb: any;
    constructor(userProfilePhoto) {
        //this.id = template.id || 0;
        this.name = userProfilePhoto.name || '';
        this.ext = userProfilePhoto.ext || 'insert drive file';
        this.user_id = userProfilePhoto.user_id || '';
    }     
}