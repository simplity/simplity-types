import { RecordFieldAndDataField } from '../common';
/**
 * Record is an ordered set of data elements
 * It is a server-side concept. However, it is used to generate forms that are used by the client-sde-apps
 */
export type Record = SimpleRecord | ExtendedRecord | CompositeRecord;
/**
 * type of a field in a record
 */
export type FieldType = 'generatedPrimaryKey' | 'primaryKey' | 'tenantKey' | 'createdBy' | 'createdAt' | 'modifiedBy' | 'modifiedAt' | 'requiredData' | 'optionalData';
type InterFieldValidationType = 
/**
 * either both fields have values or both are empty
 */
'bothOrNone'
/**
 * if first one has a value, second one also must have a value. If first one has no value, then there is no restriction on the second one.
 */
 | 'bothOrSecond'
/**
 * both must have the same value
 */
 | 'equal'
/**
 * the two must have different values
 */
 | 'different'
/**
 * one and only of the two must have a value
 */
 | 'oneOf'
/**
 * from-to-pair. Field2 must have a value greater than the value of the first one
 */
 | 'range'
/**
 * field2 must have a value greater than or equal to the first one
 */
 | 'rangeOrEqual';
type BaseRecord = {
    /**
     * record names have to be unique, but they may clash with name of other types.
     * for example a form may have the same name as the record that it is based on.
     */
    name: string;
    /**
     * used at run time for rendering additional details etc..
     *
     */
    description?: string;
    /**
     * design notes etc.. used for internal purpose. Not visible to the runtime system.
     * To be used to document design decisions etc...
     */
    notes?: string;
    /**
     * If this record represents a table/view in the RDBMS
     */
    nameInDb?: string;
    /**
     * name of the function that validates an instance of data.
     * this function must follow the prescribed API for such a function, and is made available at run time.
     * This function should be of type FormValidationFunction with scope set to 'form'
     */
    validationFn?: string;
    /**
     * timestamp technique is used to handle issues related to concurrent updates
     */
    useTimestampCheck?: boolean;
    /**
     * used to generate a form
     */
    operations?: FormOperation[];
    /**
     * a form is generated only if this is visible to client-side
     */
    isVisibleToClient: boolean;
    /**
     * if this is visible to the client-app, is authentication required for the client to trigger any form-based service?
     */
    serveGuests?: boolean;
    /**
     * used for generating demo/test data
     */
    nbrDataRowsForDemo?: number;
    /**
     * inter-field validations are invoked only if all the field validations succeed
     */
    interFieldValidations?: InterFieldValidation[];
    /**
     * related records are for documentation purpose as of now.
     */
    relatedRecords?: RelatedRecord[];
};
export type RelatedRecord = {
    /**
     * name of the other field
     */
    name: string;
    /**
     * Relationship of this record with another.
     * We have no included many-to-many because it is generally not useful that way.
     * In most cases, many-to-many is through a third record.
     * For example A->B (many-to-many) means A->C(many-to-one) and B->C(many-to-one)
     */
    type: 'one-to-one' | 'many-to-one' | 'one-to-many';
    /**
     * field name from this record, field name from the relatedRecord
     */
    matchedFields: [string, string];
};
export type SimpleRecord = BaseRecord & {
    recordType: 'simple';
    /**
     * fields that make up this record.
     * in certain contexts, the order is important Hence this is an array
     */
    fields: Field[];
};
/**
 * a record that hs fields from another record and possibly some more fields
 */
export type ExtendedRecord = BaseRecord & {
    recordType: 'extended';
    /**
     * main record from which this sub-record is defined
     */
    mainRecordName: string;
    /**
     * All fields from the main record are included by default.
     * Specify the subset of field names to be included if only a subset of fields are to be included
     */
    fieldNames?: string[];
    /**
     * any additional fields
     */
    additionalFields?: Field[];
};
export type CompositeRecord = BaseRecord & {
    recordType: 'composite';
    /**
     * main record to which the other (child) records are linked to
     */
    mainRecordName: string;
    childRecords: ChildRecord[];
};
export type Field = RecordFieldAndDataField & {
    /**
     * name is to be unique within a record
     */
    name: string;
    /**
     * this is from a data-base design perspective, if this is a column in the table.
     * otherwise, only optional/required
     */
    fieldType: FieldType;
    /**
     * required if this is a column in the RDBMS table
     */
    nameInDb?: string;
    /**
     * expression that determine how values for this field are generated across rows for demo/tst purposes
     */
    demoValue?: string;
    /**
     * visible to the client side as help text etc..
     */
    description?: string;
    /**
     * what should be the type of column in the dbDesign.
     * defaults to the type determined based on the dbTypes specified at the app-level
     */
    dbType?: string;
};
/**
 * validate a pair-of related fields
 */
export type InterFieldValidation = {
    field1: string;
    field2: string;
    validationType: InterFieldValidationType;
    messageId: string;
    /**
     * the rule is applicable if and only if field1 has this specific value
     */
    onlyIfFieldValueEquals?: 'string';
};
/**
 * operations on a record/form/data-set. Traditionally called CRUD for Create, Read, Update,Delete
 */
export type FormOperation = 'get' | 'create' | 'update' | 'delete' | 'filter' | 'save';
/**
 * A child form is linked to a parent form in a data-structure
 */
export type ChildRecord = SimpleChildRecord | EditableChildRecord | TabularChildRecord | EditableTabularChildRecord;
type BaseChild = {
    /**
     * name by which this record is added to the main record.
     * may be different from the child record name
     */
    childName: string;
    childRecordName: string;
    /**
     * if the child record is linked to the parent with one-to-many relationship.
     * this array has the names of fields in the parent to be matched for linking
     */
    parentLinkFields?: string[];
    /**
     * if the child record is linked to the parent with one-to-many relationship.
     * this array has the names of fields in the child record to be matched for linking
     */
    childLinkFields?: string[];
    /**
     * panel/group name to be rendered on the view
     */
    label?: string;
};
export type SimpleChildRecord = BaseChild & {
    childType: 'simple';
};
export type EditableChildRecord = BaseChild & {
    childType: 'editable';
    isEditable: true;
    errorId?: string;
};
export type TabularChildRecord = BaseChild & {
    childType: 'table';
    isTable: true;
};
export type EditableTabularChildRecord = BaseChild & {
    childType: 'editableTable';
    isEditable: true;
    isTable: true;
    minRows: number;
    maxRows: number;
    errorId: string;
};
export {};
