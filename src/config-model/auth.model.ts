export class AuthModel {
    public enabled: boolean = true;
    public secretKey: string = 'YourSecretKeyGoesHere';
    public ttl: number = 3600;
    public userSchemaName: string = 'users';
    public userFieldName: string = 'user';
    public passwordFieldName: string = 'password';
    public rolFieldName: string = 'rol';
    public adminFieldValue: any = 'admin';
}
