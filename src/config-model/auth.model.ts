export class AuthModel {
    public enabled: boolean = true;
    public secretKey: string = 'YourSecretKeyGoesHere';
    public ttl: number = 3600;
    public user: AuthUserModel = new AuthUserModel();
    public adminFieldValue: any = 'admin';
}

export class AuthUserModel {
    public schemaName: string = 'iluvatar_users';
    public emailFieldName: string = 'iluvatar_email'
    public userFieldName: string = 'iluvatar_user';
    public passwordFieldName: string = 'iluvatar_password';
    public rolFieldName: string = 'iluvatar_rol';
}