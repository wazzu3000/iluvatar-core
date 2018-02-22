export class AuthModel {
    public enabled: boolean = true;
    public secretKey: string = 'YourSecretKeyGoesHere';
    public ttl: number = 3600;
    public userDocumentName: string = 'user';
    public rolFieldName: string = 'rol';
    public adminFieldValue: any = 'admin';
}
