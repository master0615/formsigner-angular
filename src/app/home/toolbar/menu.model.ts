export class HomeMenuModel
{
    public model: any[] = [
            {
                'id'       : 'home',
                'title'    : 'Home',
                'type'     : 'item',
                'icon'     : 'home',
                'url'      : '/home/list',
            },
            {
                'id'       : 'login',
                'title'    : 'Login',
                'type'     : 'item',
                'icon'     : 'fingerprint',
                'url'      : '/home/login',
            },
            {
                'id'       : 'signup',
                'title'    : 'Sign Up',
                'type'     : 'item',
                'icon'     : 'person_add',
                'url'      : '/home/signup',
            }                       
        ];
}

