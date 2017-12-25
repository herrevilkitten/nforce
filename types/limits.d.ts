export interface LimitInfo {
    Max: number;
    Remaining: number;
    readonly [name: string]: any;
}

export interface Limit {
    ConcurrentAsyncGetReportInstances: LimitInfo;
    ConcurrentSyncReportRuns: LimitInfo;
    DailyApiRequests: LimitInfo;
    DailyAsyncApexExecutions: LimitInfo;
    DailyBulkApiRequests: LimitInfo;
    DailyDurableGenericStreamingApiEvents: LimitInfo;
    DailyDurableStreamingApiEvents: LimitInfo;
    DailyGenericStreamingApiEvents: LimitInfo;
    DailyStreamingApiEvents: LimitInfo;
    DailyWorkflowEmails: LimitInfo;
    DataStorageMB: LimitInfo;
    DurableStreamingApiConcurrentClients: LimitInfo;
    FileStorageMB: LimitInfo;
    HourlyAsyncReportRuns: LimitInfo;
    HourlyDashboardRefreshes: LimitInfo;
    HourlyDashboardResults: LimitInfo;
    HourlyDashboardStatuses: LimitInfo;
    HourlyODataCallout: LimitInfo;
    HourlySyncReportRuns: LimitInfo;
    HourlyTimeBasedWorkflow: LimitInfo;
    MassEmail: LimitInfo;
    SingleEmail: LimitInfo;
    StreamingApiConcurrentClients: LimitInfo;
}
