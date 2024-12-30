import { StringMap } from '../..';

/**
 * value-displayed Text pair that is generally used to
 * create an option element in a select(drop-down) element
 */
export type ListPair = {
  /**
   * internal value
   */
  value: string | number;
  /**
   * label being displayed for this value
   */
  label: string;
};
/**
 * an array of the pairs that are generally used as the data-structure behind a combo-box/select
 */
export type SimpleList = ListPair[];

/**
 * lists indexed by their corresponding key value
 */
export type KeyedList = StringMap<SimpleList>;

export type ValueList = FixedList | FixedKeyedList | RuntimeList;

export type FixedList = {
  name: string;
  listType: 'simple';
  list: SimpleList;
};

export type FixedKeyedList = {
  name: string;
  listType: 'keyed';
  keyedList: KeyedList;
};

export type RuntimeList = {
  name: string;
  listType: 'runtime';
  /**
   * note that this is db-table-name and not record-name
   */
  dbTableName: string;
  /**
   * name of the db-column for the internal value
   */
  dbColumn1: string;
  /**
   * true if dbColumn1 (internal value) is numeric
   */
  column1IsNumeric?: boolean;
  /**
   * name of teh db-column for the display value
   */
  dbColumn2: string;
  /**
   * true if this list is based on its parent key. Like states for a country.
   * If true, then keyColumn must be specified
   */
  isKeyed: boolean;
  /**
   * name of the column for the key-field. like country_id for list of states for a country
   */
  keyColumn?: string;
  /**
   * true if the parent key is numeric
   */
  keyIsNumeric?: boolean;

  okToCache?: boolean;
  tenantColumn?: string;
  activeColumn?: string;
  /**
   * used if getAllEntries is to be used.
   * For example, the client can request all states for all countries and cache them once
   */
  parentIdColumnName?: string;
  parentNameColumnName?: string;
};
