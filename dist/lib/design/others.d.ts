export type Others = {
    /**
     *  app-specific configuration parameters that may used by app-specific functions
     */
    appParams?: {
        [key: string]: any;
    };
    /**
     * URL for the server. All requests are sent to this url.
     * Only local resources are used if the url is not set
     */
    serverUrl?: string;
};
