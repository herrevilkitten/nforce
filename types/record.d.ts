export type RecordType = boolean | string | number | any | null;

export type FieldType = 'boolean' | 'datetime' | 'email' | 'id' | 'reference' | 'string';

export interface Attachment {
    fileName: string;
    body: any;
}

export class Record {
    attributes: { [name: string]: RecordType };
    _changed: string[];
    _previous: { [name: string]: RecordType };
    _fields: { [name: string]: RecordType };

    get(field: string): RecordType;

    set(fields: { [name: string]: RecordType }): void;
    set(field: string, value: RecordType): void;

    getId(): string;
    getType(): string;
    isType(type: string): boolean;
    getExternalId(): string;
    getExternalIdField(): string;
    setExternalIdField(field: string, value: RecordType);

    getAttachment(): Attachment;
    setAttachment(fileName: string, body: any): void;
    getFileName(): string | undefined;
    setFileName(fileName: string): void;
    getBody(): any | undefined;
    setBody(body: any): void;

    hasChanged(field: string): boolean;
    changed(): { [name: string]: RecordType };
    previous(): { [name: string]: RecordType };
    toJSON(): any;
}

export interface Field {
    aggregatable: boolean;
    autoNumber: boolean;
    byteLength: number;
    calculated: boolean;
    calculatedFormula: any;
    cascadeDelete: boolean;
    caseSensitive: boolean;
    compoundFieldName: null | string;
    controllerName: null | string;
    createable: boolean;
    custom: boolean;
    defaultValue: null | string;
    defaultValueFormula: null | string;
    defaultedOnCreate: boolean;
    dependentPicklist: boolean;
    deprecatedAndHidden: boolean;
    digits: number;
    displayLocationInDecimal: boolean;
    encrypted: boolean;
    externalId: boolean;
    extraTypeInfo: any;
    filterable: boolean;
    filteredLookupInfo: any;
    groupable: boolean;
    highScaleNumber: boolean;
    htmlFormatted: boolean;
    idLookup: boolean;
    inlineHelpText: any;
    label: string;
    length: number;
    mask: any;
    maskType: any;
    name: string;
    nameField: boolean;
    namePointing: boolean;
    nillable: boolean;
    permissionable: boolean;
    picklistValues: any[];
    precision: number;
    queryByDistance: boolean;
    referenceTargetField: any;
    referenceTo: any[];
    relationshipName: null | string;
    relationshipOrder: any;
    restrictedDelete: boolean;
    restrictedPicklist: boolean;
    scale: number;
    soapType: string;
    sortable: boolean;
    type: FieldType;
    unique: boolean;
    updateable: boolean;
    writeRequiresMasterRead: boolean;
}

export interface ChildRelationship {
    cascadeDelete: boolean,
    childSObject: string,
    deprecatedAndHidden: boolean,
    field: string,
    junctionIdListNames: any[],
    junctionReferenceTo: any[],
    relationshipName: string,
    restrictedDelete: boolean
}

export interface TypeInfos {
    available: boolean,
    defaultRecordTypeMapping: boolean,
    master: boolean,
    name: string,
    recordTypeId: string,
    urls: { [name: string]: string },
}

export interface SupportedScope {
    label: string;
    name: string;
}

export interface SObject {
    actionOverrides: any[];
    activateable: boolean;
    childRelationships: ChildRelationship[];
    compactLayoutable: boolean;
    createable: boolean;
    custom: boolean;
    customSetting: boolean;
    deletable: boolean;
    deprecatedAndHidden: boolean;
    feedEnabled: boolean;
    fields: Field[];
    hasSubtypes: boolean;
    isSubtype: boolean;
    keyPrefix: string;
    label: string;
    labelPlural: string;
    layoutable: boolean;
    listviewable: null | boolean;
    lookupLayoutable: null | boolean;
    mergeable: boolean;
    mruEnabled: boolean;
    name: string;
    namedLayoutInfos: any[];
    networkScopeFieldName: null | string;
    queryable: boolean;
    recordTypeInfos: TypeInfos[];
    replicateable: boolean;
    retrieveable: boolean;
    searchLayoutable: boolean;
    searchable: boolean;
    supportedScopes: SupportedScope[];
    triggerable: boolean;
    undeletable: boolean;
    updateable: boolean;
    urls: { [name: string]: string };
}
