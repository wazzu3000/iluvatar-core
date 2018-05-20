import { Dictionary, ClassType, DatabaseType, Field, JavascriptType } from './../types';

/**
 * Clase que almacena la estructura de como deben estar formados los datos en
 * base de datos
 */
export class Schema {
    private static dbTypesSupported: DatabaseType[] = [];
    private static typesBySchema: Dictionary<string, Dictionary<string, JavascriptType>> = {};
    private static uniqueIndexesBySchema: Dictionary<string, string[]> = {};
    private _javascriptTypes: Dictionary<string, JavascriptType>;
    private uniqueIndexes: string[] = [];
    protected rolesToEdit: any[] = [];
    protected rolesToCreate: any[] = [];
    protected rolesToUpdate: any[] = [];
    protected rolesToDelete: any[] = [];

    /**
     * Inicializa una nueva instancia para almacenar el esquema de los datos
     * @param _name Nombre del esquema que se usará para almacenar u obtener datos
     * @param _fields Arreglo de la estructura de campois que representa el esquema de cada campo en particular
     */
    protected constructor(private _name: string, private _fields: Dictionary<string, Field>) {
        // If the types was previusly stored, then add these types to the attribute
        this._javascriptTypes = Schema.typesBySchema[_name];
        this.uniqueIndexes = Schema.uniqueIndexesBySchema[_name];
        if (this._javascriptTypes) {
            return;
        }

        // Store in a static hash the javascripts types for the next new instances
        let typesBySchema: Dictionary<string, JavascriptType> = {};
        let uniqueIndexes: string[] = [];
        for (let fieldName in _fields) {
            let field = _fields[fieldName];
            if (typeof(field.type) == 'string') {
                let typeSetted = false;
                for (let type of Schema.dbTypesSupported) {
                    if (type.databaseType.test(field.type)) {
                        typeSetted = true;
                        typesBySchema[fieldName] = type.javascriptType;
                        break;
                    }
                }
                if (!typeSetted) {
                    throw `The type ${field.type} is incorrect`;
                }
            }
            if (field.unique) {
                uniqueIndexes.push(fieldName);
            }
        }
        this._javascriptTypes = Schema.typesBySchema[_name] = typesBySchema;
        this.uniqueIndexes = Schema.uniqueIndexesBySchema[_name] = uniqueIndexes;
    }

    public static setDbTypesSupported(databaseTypes: DatabaseType[]): void {
        Schema.dbTypesSupported = databaseTypes;
    }

    public get name(): string {
        return this._name;
    }

    public get fields(): Dictionary<string, Field> {
        return this._fields;
    }

    public get javascriptTypes(): Dictionary<string, JavascriptType> {
        return this._javascriptTypes;
    }

    public cleanAndVerifyValues(payload: any): any {
        // I create a new value in case that is sended a value that not exists in Field's array
        let payloadVerified: any = {};
        let fieldsEmptyRequired: string[] = [];
        for (let fieldName in this.fields) {
            let field = this.fields[fieldName];
            let payloadValue = payload[fieldName];
            let javascriptType = this._javascriptTypes[fieldName];
            if (payloadValue) {
                this.verifyType(payloadValue, javascriptType);
                payloadVerified[fieldName] = payloadValue;
            } else {
                let defaultValue = field.default;
                if (defaultValue) {
                    this.verifyType(defaultValue, javascriptType);
                    payloadVerified[fieldName] = defaultValue;
                } else if (field.required) {
                    fieldsEmptyRequired.push(fieldName);
                }
            }
        }
        if (fieldsEmptyRequired.length > 0) {
            throw `The folow fields are required and haven't default value: ${fieldsEmptyRequired.join(', ')}`;
        }
        return payloadVerified;
    }

    public cleanValues(payload: any): any {
        let payloadClean: any = {};
        for (let fieldName in this.fields) {
            let payloadValue = payload[fieldName];
            if (payloadValue) {
                this.verifyType(payloadValue, this._javascriptTypes[fieldName]);
                payloadClean[fieldName] = payloadValue;
            }
        }
        return payloadClean;
    }

    public getUniqueIndexes(): string[] {
        return this.uniqueIndexes;
    }

    public canEdit(rol: any): boolean {
        return this.rolesToEdit.length == 0 ? true : this.rolesToEdit.indexOf(rol) >= 0;
    }

    public canCreate(rol: any): boolean {
        return this.rolesToCreate.length == 0 ? true : this.rolesToCreate.indexOf(rol) >= 0;
    }

    public canUpdate(rol: any): boolean {
        return this.rolesToUpdate.length == 0 ? true : this.rolesToUpdate.indexOf(rol) >= 0;
    }

    public canDelete(rol: any): boolean {
        return this.rolesToDelete.length == 0 ? true : this.rolesToDelete.indexOf(rol) >= 0;
    }

    private verifyType(value: any, javascriptType: JavascriptType): void {
        if (typeof(javascriptType) == 'string') {
            if (typeof(value) != javascriptType) {
                throw `The type sended for the value ${value} is invalid`;
            }
        } else {
            if (!(value instanceof javascriptType)) {
                throw `The type sended for the value ${value} is invalid`;
            }
        }
    }
}