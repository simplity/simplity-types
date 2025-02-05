import { FunctionDetails, FunctionType, ListSource, StringMap } from './common';
import { Layout, MenuItem, Module } from './design/layout';
import { ValueList } from './design/list';
import { Page } from './design/page';
import { PageAlteration } from './design/pageAlteration';
import { Record } from './design/record';
import { ServiceResponse, ServiceSpec } from './design/serviceSpec';
import { Sql } from './design/sql';
import { PageTemplate } from './design/template';
import { ValueSchema } from './design/valueSchema';
import { Form } from './runtime/form';
import { Service } from './runtime/service';
/**
 * Meta data that the app-designer creates and maintains.
 * These are pure meta-data and no programs/logic.
 * These are organized in .ts files, but they are actually JSONs.
 * We are using TS for ease of type-based editing features.
 * The meta data forms the core for server-app and the client-app.
 * This approach avoids duplication of design for client-app and server-app
 */
export type AppDesign = CommonOnes & OnlyMeta & MetaAndDesign;
/**
 * These components form the actual design of the client-app.
 * Most of them come directly from the meta-data.
 * Others are generated from meta-data.
 * These are all pure meta-data with no logic/program.
 * They are actually JSONs wrapped as TS for ease of type-based editing.
 */
export type ClientDesign = CommonOnes & OnlyDesign & MetaAndDesign & DesignAndRuntime;
/**
 * All the components that make-up the runtime for this app.
 * Essentially Design + functions
 */
export type ClientRuntime = CommonOnes & OnlyRuntime & DesignAndRuntime;
/**
 * metadata that is used as part of runtime as well.
 * Obviously, these are part of design as well.
 */
type CommonOnes = {
    name: string;
    /**
     * default max length to be used for a text-value-schema with no max specified
     */
    maxLengthForTextField: number;
    /**
     *  app-specific configuration parameters that may be used by app-specific functions
     */
    appParams?: {
        [key: string]: any;
    };
    /**
     * simplity agent manages login process, if it is configured at the app level.
     * this service, if specified, has to conform to the login-specific API
     */
    loginServiceName?: string;
    /**
     * simplity agent invokes the logout service, but does not expect any response back.
     */
    logoutServiceName?: string;
    /**
     * URL for the server. All requests are sent to this url.
     * Only local resources are used if the url is not set
     */
    serverUrl?: string;
    /**
     * e.g. ./assets/images/
     */
    imageBasePath: string;
    /**
     * layout to render on load
     */
    startingLayout: string;
    /**
     * module to be selected by default on loading
     */
    startingModule: string;
    /**
     * ready responses are cached responses by serviceNames,  by the client.
     * we may also decide to shift them to the server side on a need basis.
     * this feature is useful during development and for demo purposes
     * if a ready response is available, the response is used instead of calling a service
     */
    cachedResponses?: StringMap<ServiceResponse>;
    /**
     * page layouts. The way the page as the user views is laid out from its components
     */
    layouts?: StringMap<Layout>;
    /**
     * how the visual components are laid out on the canvas
     */
    menuItems?: StringMap<MenuItem>;
    /**
     * run-time messages
     */
    messages?: StringMap<string>;
    /**
     * modules of the app. It's a logical grouping of pages
     */
    modules?: StringMap<Module>;
    /**
     * pages that are hand-coded by the app-designer, without using any template
     */
    pages?: StringMap<Page>;
    /**
     * validation schemas
     */
    valueSchemas?: StringMap<ValueSchema>;
    /**
     * all the html source/text for the view components
     */
    htmls?: StringMap<string>;
};
/**
 * As per our current design, Only purpose of Design is to feed into runtime
 * In other words, runtime is a superset of design-time.
 * Hence this is to be empty
 */
type MetaAndDesign = {};
type DesignAndRuntime = {
    /**
     * how to get list of name-value pairs for drop-down boxes?
     * run-time list sources are used to generate run-time components
     * design-time list sources are converted as "valueLists"
     */
    listSources?: StringMap<ListSource>;
    /**
     * forms that are generated from records
     */
    forms?: StringMap<Form>;
};
/**
 * attributes that are in meta that are not passed to Design.
 * These are used for creating other artifacts.
 */
type OnlyMeta = {
    records: StringMap<Record>;
    /**
     * values lists consist of both design-time and run-time.
     * server needs all of them, while the client doesn't keep track of the run-time ones.
     * json file is created for the server, and listSources.ts file is generated for the client
     */
    valueLists: StringMap<ValueList>;
    /**
     * page templates are short-cuts to generate a standard (predefined-format) page.
     */
    templates?: StringMap<PageTemplate>;
    /**
     * small alteration to a designed or generated page.
     */
    pageAlterations?: StringMap<PageAlteration>;
    /**
     * sqls are server-side components to interface with the database
     */
    sqls?: StringMap<Sql>;
    /**
     * if this app is an multi-tenant app.
     */
    tenantFieldName?: string;
    /**
     * column name in db tables for the tenant column
     */
    tenantNameInDb?: string;
    /**
     * server-side. Used for generating java classes
     */
    javaRootPackageName?: string;
    /**
     * all functions defined for this app. Note that the function name has to be unique across all pages.
     * an App may follow naming convention like pageName.functionName if the app is quite large
     */
    functions?: StringMap<FunctionType>;
    /**
     * API (input-output) specification for all the services that are exposed by the server-app for the client-app
     */
    serviceSpecs?: StringMap<ServiceSpec>;
};
/**
 * As per our current design, Only purpose of Design is to feed into runtime
 * In other words, runtime is a superset of design-time.
 * Hence this is to be empty
 */
type OnlyDesign = {};
type OnlyRuntime = {
    /**
     * local lists are cached responses to getList(). Useful during development/demo
     * this is a run-time concept to override a design component at run time
     */
    localLists?: StringMap<ValueList>;
    /**
     * local services are used during development as stubs.
     * a service  that is meant to be served by the server is over-ridden to be served locally on the client instead
     */
    localServices?: StringMap<Service>;
    /**
     * functions with specs and actual implementations
     */
    functionDetails?: StringMap<FunctionDetails>;
};
export {};
