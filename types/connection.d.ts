import { Field, SObject, Record } from './record';
import { RecordType } from './index';
import { Limit, LimitInfo } from './limits';

import { EventEmitter } from 'events';
import { StreamingClient, StreamingSubscription } from './streaming';

export type ModeType = 'single' | 'multi';

export type EnvironmentType = 'production' | 'sandbox';

export interface RefreshHandler {
    (oldAuth: AuthenticateResponse, newAuth: AuthenticateResponse, callback: (error?: any) => void): void;
}

export interface ConnectionOptions {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    apiVersion?: string | number;
    environment?: EnvironmentType;
    authEndpoint?: string;
    testAuthEndpoint?: string;
    loginUri?: string;
    testLoginUri?: string;
    mode?: ModeType;
    gzip?: boolean;
    autoRefresh?: boolean;
    onRefresh?: RefreshHandler;
    timeout?: number;
    username?: string;
    password?: string;
    securityToken?: string;
    oauth?: any;
    plugins?: string[];
}

export type ScopeType = 'api' | 'chatter_api' | 'full' | 'id' | 'refresh_token' | 'visualforce' | 'web';

export type PromptType = 'login' | 'consent';

export interface BaseOptions {
    headers?: { [name: string]: string };
}

export interface RequestOptions extends BaseOptions {
    requestOpts?: { [name: string]: any };
}

export interface SObjectOptions extends RequestOptions {
    sobject: Record;
}

export interface GetAuthUriOptions extends BaseOptions {
    responseType?: string;
    authEndpoint?: string;
    display?: string;
    immediate?: boolean;
    scope?: ScopeType[];
    state?: string;
    nonce?: string;
    prompt?: PromptType | PromptType[];
    loginHint?: string;
    urlOpts?: string;
}

export interface AuthenticateOptions {
    code?: string;
    username?: string;
    password?: string;
    securityToken?: string;
    assertion?: string;
    executeOnRefresh?: boolean;
    requestOpts?: { [name: string]: any };
}

export interface AuthenticateResponse {
    access_token: string;
    instance_url: string;
    id: string;
    token_type: string;
    issued_at: string;
    signature: string;
}

export interface RefreshTokenOptions extends RequestOptions {
    assertion?: string;
    executeOnRefresh?: boolean;
}

export interface RevokeTokenOptions extends RequestOptions {
    token?: string;
    callbackParam?: string;
}

export interface GetPasswordStatusOptions extends RequestOptions {
    id?: string;
    sobject?: string;
}

export interface UpdatePasswordOptions extends RequestOptions {
    newPassword: string;
    id?: string;
    sobject?: string;
}

export interface GetIdentityOptions extends RequestOptions {
}

export interface VersionInformation {
    label: string;
    url: string;
    version: string;
}

export interface GetResourceOptions extends RequestOptions {
}

export interface GetResourceResponse {
    [name: string]: string;
}

export interface GetSObjectsOptions extends RequestOptions {
}

export interface GetSObjectsResponse {
    encoding: string;
    maxBatchSize: number;
    sobjects: SObject[];
}

export interface GetMetadataOptions extends RequestOptions {
    type: string;
}

export interface GetMetadataResponse {
    objectDescribe: SObject;
    recentItems: any[];
}

export interface GetDescribeOptions extends RequestOptions {
    type: string;
}

export interface GetLimitOptions extends BaseOptions {
}

export interface InsertOptions extends SObjectOptions {
}

export interface InsertResponse {
    id: string;
    success: boolean;
    errors: string[];
}

export interface UpdateOptions extends SObjectOptions {
}

export interface UpsertOptions extends SObjectOptions {
}

export interface DeleteOptions extends SObjectOptions {
}

export interface GetRecordOptions extends RequestOptions {
    sobject?: Record;
    fields?: string[];
    type?: string;
    id?: string | number;
    raw?: boolean;
}

export interface GetBodyOptions extends RequestOptions {
    sobject?: Record;
    type?: string;
    id?: string;
}

export interface GetAttachmentBodyOptions extends RequestOptions {
    sobject?: Record;
    id?: string;
}

export interface GetDocumentBodyOptions extends RequestOptions {
    sobject?: Record;
    id?: string;
}

export interface GetContentVersionOptions extends RequestOptions {
    sobject?: Record;
    id?: string;
}

export interface QueryOptions extends RequestOptions {
    query: string;
    includeDeleted?: boolean;
    raw?: boolean;
    fetchAll?: boolean;
}

export interface QueryResponse<T extends Record> {
    done: boolean;
    records: [T];
    totalSize: number;
}

export interface QueryAllOptions extends RequestOptions {
    query: string;
    raw?: boolean;
}

export interface SearchOptions extends RequestOptions {
    search?: string;
    raw?: boolean;
}

export interface GetUrlOptions extends RequestOptions {
    url: string;
}

export interface CreateStreamClientOptions extends BaseOptions {
    timeout?: number;
    retry?: number;
}

export interface SubscribeStreamOptions extends BaseOptions {
    topic: string;
    isSystem?: boolean;
    timeout?: number;
    retry?: number;
}

export interface ApexRestOptions extends RequestOptions {
    uri: string;
    method?: string;
    urlParams?: string | { [name: string]: RecordType };
    body?: any;
}

export interface AutoRefreshTokenOptions extends RequestOptions {
}

export interface ForceError {
    body: Array<{
        message: string;
        errorCode: string;
        fields: string[];
    }>;
    errorCode: string;
    statusCode: number;
}

export class Connection implements ConnectionOptions {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    apiVersion?: string | number;
    environment?: EnvironmentType;
    authEndpoint?: string;
    testAuthEndpoint?: string;
    loginUri?: string;
    testLoginUri?: string;
    mode?: ModeType;
    gzip?: boolean;
    autoRefresh?: boolean;
    onRefresh?: RefreshHandler;
    timeout?: number;
    username?: string;
    password?: string;
    securityToken?: string;
    oauth?: any;

    constructor(options: ConnectionOptions);

    addPlugin(pluginModule: string, pluginName?: string): Connection;

    getOAuth(options?: GetAuthUriOptions): AuthenticateResponse;

    setOAuth(oauth: AuthenticateResponse): void;

    getUsername(): string;

    setUsername(username: string): void;

    getPassword(): string;

    setPassword(password: string): void;

    getSecurityToken(): string;

    setSecurityToken(securityToken: string): void;

    getAuthUri(options?: GetAuthUriOptions): string;

    authenticate(data: AuthenticateOptions, callback?: (error: any, response: AuthenticateResponse) => void): Promise<AuthenticateResponse>;

    refreshToken(data: RefreshTokenOptions, callback?: Function): Promise<string>;

    revokeToken(data: string | RevokeTokenOptions, callback?: Function): Promise<any>;

    getPasswordStatus(data: string | GetPasswordStatusOptions, callback?: Function): Promise<any>;

    updatePassword(options?: UpdatePasswordOptions, callback?: Function): Promise<any>;

    getIdentity(options?: GetIdentityOptions, callback?: Function): Promise<any>;

    getVersions(callback?: (error: any, response: VersionInformation[]) => void): Promise<VersionInformation[]>;

    getResources(options?: GetResourceOptions, callback?: (error: any, response: GetResourceResponse) => void): Promise<GetResourceResponse>;

    getSObjects(option?: GetSObjectsOptions, callback?: (error: any, response: GetSObjectsResponse) => void): Promise<GetSObjectsResponse>;

    getMetadata(data: string | GetMetadataOptions, callback?: (error: any, response: GetMetadataResponse) => void): Promise<GetMetadataResponse>;

    getDescribe(data: string | GetDescribeOptions, callback?: (error: any, response: SObject) => void): Promise<SObject>;

    getLimits(data?: string | GetLimitOptions, callback?: (error: any, response: Limit) => void): Promise<Limit>;

    insert(options: InsertOptions, callback?: Function): Promise<InsertResponse>;

    update(options: UpdateOptions, callback?: Function): Promise<any>;

    upsert(options: UpsertOptions, callback?: Function): Promise<any>;

    delete(options: DeleteOptions, callback?: Function): Promise<any>;

    getRecord(options: GetRecordOptions, callback?: (error: any, response: Record) => void): Promise<Record>;

    getBody(options: GetBodyOptions, callback?: Function): Promise<any>;

    getAttachmentBody(options: GetAttachmentBodyOptions, callback?: Function): Promise<Buffer>;

    getDocumentBody(options: GetDocumentBodyOptions, callback?: Function): Promise<any>;

    getContentVersionBody(options: GetContentVersionOptions, callback?: Function): Promise<any>;

    query<T extends Record>(options: QueryOptions, callback?: (error: any, response: QueryResponse<T>) => void): Promise<QueryResponse<T>>;

    queryAll<T extends Record>(options: QueryAllOptions, callback?: (error: any, response: QueryResponse<T>) => void): Promise<QueryResponse<T>>;

    search(data: string | SearchOptions, callback?: Function): Promise<any>;

    getUrl(data: string | GetUrlOptions, callback?: Function): Promise<any>;

    /*****************************
     * streaming api
     *****************************/

    createStreamClient(options?: BaseOptions): StreamingClient;

    subscribe(options: SubscribeStreamOptions): StreamingSubscription;

    /*****************************
     * plugin support
     *****************************/

    readonly [plugin: string]: any;
}

export function createConnection(options: ConnectionOptions): Connection;
