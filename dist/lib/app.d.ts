import { StringMap, Layout, MenuItem, Module, Page, ValueSchema, ValueFormatter } from '..';
/**
 *App level attributes that are set at design time, but also used directkly at run time
 */
export type AppCommonAttributes = {
    name: string;
    version?: string;
    date?: string;
    description?: string;
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
     * default page size to be used for paginating tables that do not specify a table-specific page size
     * Works only if the app provides a plugin to render tables with pagination
     */
    defaultPageSize?: number;
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
    valueSchemas?: StringMap<ValueSchema>;
    valueFormatters?: StringMap<ValueFormatter>;
    /**
     * all the html source/text for the view components
     */
    htmls?: StringMap<string>;
};
