import { ValueType } from '../..';

export type ReadSql = {
  name: string;
  description: string;
  sqlType: 'readOne' | 'readMany';
  /**
   * Note that the first part of the sql "SELECT ...... FROM table_or_view_name " is generated by the framework.
   * This field provides the part of the sql to be appended to the above generated sql.
   * In most cases, this starts with WHERE followed by where conditions and sort/group etc..
   * e.g WHERE  active = true AND customer_id = ?
   * However, in some rare cases, you may start this with a JOIN clause if the join-on condition requires some run-time parameters.
   *  e.g. t1 LEFT JOIN table_2 t2 on t1.id = t2.id AND t2.date = ? WHERE ...... ORDER BY ....
   *
   */
  sql: string;
  /**
   * name of the table/view in the database from which to read data rows
   */
  readFrom: string;
} & ({ inputFields: InputField[] } | { inputRecord: string } | {}) &
  ({ outputFields: OutputField[] } | { outputRecord: string });

export type WriteSql = {
  name: string;
  description: string;
  sqlType: 'write';
  /**
   * sql must start with insert/update/delete
   */
  sql?: string;
} & ({ inputFields: InputField[] } | { inputRecord: string } | {});

export type StoredProcedure = {
  name: string;
  description: string;
  sqlType: 'call';
  procedureName: string;
  returnType?: ValueType;
} & ({ inputFields: InputField[] } | { inputRecord: string } | {}) &
  (
    | { outputFields: OutputField[] }
    | { outputRecord: string }
    | { resultRecords: (string | undefined)[] }
    | {}
  );

export type Sql = ReadSql | WriteSql | StoredProcedure;
/**
 * Input parameter for a SQL
 */
export type InputField = {
  /**
   * name is to be unique within a record
   */
  name: string;
  valueType: ValueType;
  /**
   * used for validation as well as generating sql script
   */
  isRequired?: boolean;
  /**
   * if specified, it should be a
   */
  defaultValue?: string;
  /**
   * if additional validations are required
   */
  valueSchema?: string;
};

/**
 * Output field from a select/read statement
 */
export type OutputField = {
  name: string;
  nameInDb: string;
  valueType: ValueType;
};
