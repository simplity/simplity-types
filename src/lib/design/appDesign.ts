import {
  StringMap,
  Layout,
  MenuItem,
  Module,
  Page,
  ServiceSpec,
  Sql,
  PageTemplate,
  ValueSchema,
  PageAlteration,
  ListSource,
  FunctionType,
  Record,
  ValueList,
} from '../..';

/**
 *   attributes/components that are used as-they-are at run time
 */
export type CommonAppAttributes = {
  name: string;
  version: string;
  date: string;

  description: string;

  /**
   * default max length to be used for a text-value-schema with no max specified
   */
  maxLengthForTextField: number;
  /**
   * simplity agent manages login process, if it is configured at the app level.
   * this service, if specified, has to conform to the login-specific API
   */
  loginServiceName?: string;
  /**
   * simplity agent invokes the logout service, but does not expect any response back.
   */
  logoutServiceName?: string;

  /////////////// Design Components
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
   * all the html source/text for the view components
   */
  htmls?: StringMap<string>;
  /**
   * how to get list of name-value pairs for drop-down boxes?
   * run-time list sources are used to generate run-time components
   * design-time list sources are converted as "valueLists"
   */
  listSources?: StringMap<ListSource>;

  /**
   * pages that are hand-coded by the app-designer, without using any template
   */
  pages?: StringMap<Page>;
};
/**
 *   attributes/components that are used as-they-are at run time
 */
export type AppDesign = CommonAppAttributes & {
  /**
   * default max length to be used for a text-value-schema with no max specified
   */
  maxLengthForTextField: number;

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

  records: StringMap<Record>;
  /**
   * values lists consist of both design-time and run-time.
   * server needs all of them, while the client doesn't keep track of the run-time ones.
   * json file is created for the server, and listSources.ts file is generated for the client
   */
  valueLists: StringMap<ValueList>;
  /**
   * validation schemas
   */
  valueSchemas: StringMap<ValueSchema>;

  /**
   * page templates are short-cuts to generate a standard (predefined-format) page.
   */
  templates?: StringMap<PageTemplate>;
  /**
   * small alteration to a designed or generated page.
   */
  pageAlterations?: StringMap<PageAlteration>;

  ///////////////// components that are used to generate run-time artifacts or other
  /**
   * sqls are server-side components to interface with the database
   */
  sqls?: StringMap<Sql>;

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
