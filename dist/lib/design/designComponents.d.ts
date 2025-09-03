import { StringMap } from '../common';
import { FunctionType } from '../runtime';
import { Layout, MenuItem, Module } from './layout';
import { ValueList } from './list';
import { Page } from './page';
import { PageAlteration } from './pageAlteration';
import { Record } from './record';
import { ServiceSpec } from './serviceSpec';
import { Sql } from './sql';
import { PageTemplate } from './template';
import { ValueSchema } from './valueSchema';
/**
 * components that are expressed as objects in TypeScript in the design module.
 * This is internal to the design layer, and not exposed to run time layer.
 * Some of these are directly used at run time, while others are used for generating other components.
 */
export type DesignComponents = {
    alters: StringMap<PageAlteration>;
    functions: StringMap<FunctionType>;
    layouts: StringMap<Layout>;
    menuItems: StringMap<MenuItem>;
    modules: StringMap<Module>;
    pages: StringMap<Page>;
    records: StringMap<Record>;
    specs: StringMap<ServiceSpec>;
    sqls: StringMap<Sql>;
    templates: StringMap<PageTemplate>;
    valueLists: StringMap<ValueList>;
    valueSchemas: StringMap<ValueSchema>;
};
