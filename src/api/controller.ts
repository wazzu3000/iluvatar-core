export interface IController {
    get(payload: any, id?: any): Promise<any[]>;
    post(payload: any, id?: any): Promise<any>;
    put(payload: any, id?: any): Promise<any>;
    delete(payload: any, id?: any): Promise<boolean>;
}