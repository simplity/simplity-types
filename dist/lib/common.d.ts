import { AppController, BaseView, Button, DetailedMessage, FormController, KeyedList, PageController, ServiceResponse, SimpleList, StaticComp, ValueType } from '..';
/**
 * entity string index
 */
export type StringMap<T> = {
    [name: string]: T;
};
export type OptionalOf<T> = {
    [K in keyof T]?: T[K];
};
/**
 * Technique to incorporate condition like (one of a,b, or c must be specified)
 */
export type OneOf<T> = {
    [K in keyof T]: {
        [P in K]: T[K];
    } & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];
/**
 * ways to render a field(data-bound control) in a page/form
 */
export type FieldRendering = 'hidden' | 'output' | 'image' | 'text-field' | 'text-area' | 'password' | 'select' | 'select-output' | 'check-box';
/**
 * Field of a record is used for rendering a DataField on the page.
 * Here are the  attributes of a Field in a record that is meant for the DataField
 */
export type RecordFieldAndDataField = {
    /**
     * if specified, it should be a
     */
    defaultValue?: string;
    /**
     * relevant if this field is included in a tabular list
     */
    filterable?: boolean;
    /**
     * used by the client-side for rendering a tabular list of rows. Typically, ids are hidden,
     */
    hideInList?: boolean;
    /**
     * some fields in a record may be managed programmatically, and are not edited by the end-user
     */
    hideInSave?: boolean;
    /**
     * used by the client-side for rendering
     */
    hint?: string;
    /**
     * used by the client-side for rendering
     */
    icon?: string;
    /** for image field */
    imageNamePrefix?: string;
    /** for image fields */
    imageNameSuffix?: string;
    /**
     * not recommended, but in some cases the field may contain an array of values.
     * if this is set to true, then it is assumed that the field is actually a text-field and the value must be a comma-separated list of values,each of which conform to the specified value-schema
     */
    isArray?: boolean;
    /**
     * used by the client-side for rendering
     */
    label?: string;
    /**
     * formatter
     */
    valueFormatter?: string;
    /**
     * if the list of values is a keyed-list and the key value is to be taken from another field.
     * Like state-code that would depend on 'country-code'
     */
    listKeyFieldName?: string;
    /**
     * in case the list is keyed, but this field uses a deign-time fixed value for the key.
     * e.g. reportField uses a keyed-list named reportFields, and the current field is mean for a reportName="users"
     * in such a case, listKeyName should not be specified, but listKeyValue="users"
     */
    listKeyValue?: string | number;
    /**
     * if the value is one of a list of enumerated values..
     * like if the field is country-code, then it may be associated with a pre-defined list named 'countries'
     */
    listName?: string;
    /**
     * if this field is a drop-down.
     * to be used only if the list is simple, and is not a common one across several other fields.
     * also useful if the field is synthesized at run time.
     */
    listOptions?: SimpleList;
    /**
     * id for the message to be flashed in the client if this field fails validation
     */
    messageId?: string;
    /**
     * any custom action to be taken while user keeps typing value for this field.
     * If specified, this action must be defined in the page.ts
     */
    onBeingChanged?: string;
    /** any custom action to be taken on change of this field. If specified, this action must be defined in the page.ts */
    onChange?: string;
    /**
     * to action when the field is clicked
     */
    onClick?: string;
    /**
     * used by the client-side for rendering
     */
    placeHolder?: string;
    /**
     * used by the client-side for rendering
     */
    prefix?: string;
    /**
     * how should this field be rendered in a form/page?
     */
    renderAs?: FieldRendering;
    /**
     * relevant if this field is included in a tabular list
     */
    sortable?: boolean;
    /**
     * used by the client-side for rendering
     */
    suffix?: string;
    /**
     * used for validating ranges.
     * May also be used for rendering date-range instead of two separate date fields.
     */
    toField?: string;
    /**
     * how to validate the value of this field?
     * optional for fields that are not coming from an external source.
     * however, it also serves as a good documentation about the expected range of values.
     * hence it is highly recommended that this is specified.
     */
    valueSchema?: string;
    /**
     * value type 'boolean' 'text' 'integer' etc..
     */
    valueType: ValueType;
    /**
     * used by the client-side for rendering
     */
    width?: VisualWidth;
};
/**
 * A global function that is accessible at the app level.
 *
 * @param ac: the app controller
 * @param params: additional parameters passed to the function
 * @param msgs array to which the function can add messages that may be passed on to the UX
 * @returns any. In some situations the return value may also be checked for truthy/falsy to trigger events like onsuccess etc..
 */
export type GlobalFunction = (ac: AppController, params: StringMap<any> | undefined, msgs: DetailedMessage[]) => unknown;
/**
 * A function that is to be triggered on some event. This is executed with page as the context.
 *
 * @param pc: the page controller used by this page
 * @param params: optional parameters for this function. If used, this is typically an object with name-value pairs.
 * onChange and OnChanging event call-back functions receive an object with {fieldName, value, event} attributes
 * @param msgs array to which the function can add messages that may be passed on to the UX
 * @returns any. In some situations the return value may also be checked for truthy/falsy to trigger evens like onsuccess etc..
 */
export type PageFunction = (pc: PageController, params: StringMap<any> | undefined, msgs: DetailedMessage[]) => unknown;
/**
 * a function that is triggered on events like
 * onChanged, onChanging, onValueChanged etc..
 * This is executed with form as the context. function can access only the form controller
 * (In case the function requires access to page level context, use page)
 * @param fc controller for this field
 * @param params   onChange and OnChanging event call-back functions receive an object with {fieldName, value, event} attributes
 * @param msgs array to which the function can add messages that may be passed on to the UX
 * @returns any. In some situations the return value may also be checked for truthy/falsy to trigger evens like onsuccess etc..
 */
export type FormFunction = (fc: FormController, param: StringMap<any> | undefined, msgs: DetailedMessage[]) => unknown;
/**
 * a function that is triggered just before requesting a service using a ServiceAction.
 * This is an intercept function that can either modify the payload for the request, or abort the request with an error message.
 * @param fc controller of the form being submitted. Note that the PageController is accessible from this.
 * @param payload that accompanies the request.
 * @param msgs array to which the function should add messages in case the request is to be aborted
 * @returns true to say OK for the request. false to abort the request.
 */
export type RequestFunction = (fc: FormController, payload: Vo | undefined, msgs: DetailedMessage[]) => boolean;
/**
 * An intercept function that is triggered after the response is received for an ServiceAction,
 * but before the serviceResponse is processed by the controller.
 * @param pc page controller
 * @param response serviceResponse that may be modified by this function
 */
export type ResponseFunction = (pc: PageController, response: ServiceResponse) => void;
/**
 * A form validation functions returns an array of messages in case of validation errors, or undefined if there are no errors
 */
export type FormValidationFunction = (fc: FormController) => [{
    fieldName: string;
    message: string;
}] | undefined;
/**
 * function to be called to initialize a view-component after it is created by the view-layer of simplity.
 * e.g. in html, if flatpickr is used, the inputElement must be initialized.
 * @param view  abstract base-view. implementation should cast it to the rendering-specific element
 * for e.g. in html this is BaseElement.
 */
export type ViewInitFunction = (view: BaseView) => void;
export type FunctionDetails = {
    type: 'global';
    fn: GlobalFunction;
} | {
    type: 'request';
    fn: RequestFunction;
} | {
    type: 'response';
    fn: ResponseFunction;
} | {
    type: 'page';
    fn: PageFunction;
} | {
    type: 'form';
    fn: FormFunction | FormValidationFunction;
} | {
    type: 'value';
    fn: ValueValidationFn;
} | {
    type: 'format';
    fn: FormatterFunction;
} | {
    type: 'init';
    fn: ViewInitFunction;
};
/**
 * function type. type alias "FunctionDetails" defines the signature of each of these types
 */
export type FunctionType = FunctionDetails['type'];
/**
 * status returned by the controller when a function is requested at run time
 */
export type FnStatus = {
    /**
     * true if the function was called with success, false in case of any error, like function not defined, or the function threw an exception
     */
    allOk: boolean;
    /**
     * value returned by the function, if it got executed successfully
     */
    returnedValue?: unknown;
};
export type AppError = {
    error: string;
};
/**
 * Error object emitted by a value-schema validator
 */
export type SchemaError = {
    name: string;
    params?: string[];
};
/**
 * function that validates the supplied value, after parsing itq.
 */
export type ValueValidationFn = (value: {
    value: string;
}) => ValueValidationResult;
/**
 * data-structure returned by a validation function.
 * value is undefined if the string could not be parsed into the right type
 */
export type ValueValidationResult = {
    /**
     * NULL_VALUE (and not undefined) if the parsing fails. (refer to getNullValue() method))
     * parsed value of the right type, if parsing is successful, even of the validation fails.
     * IMP: should check for messages to know if this value is valid or not.
     */
    value?: Value;
    /**
     * undefined if the value is valid.
     * at least one message in the array if the validation fails. (never empty array).
     * multiple messages possible if the field has multiple validation rules
     */
    messages: ValidationMessage[];
} | {
    value: Value;
    messages?: ValidationMessage[];
};
export type ValidationMessage = {
    /**
     * messages are externalized. run-time environment would get the actual text for this in the desired language
     */
    messageId: string;
    alertType: AlertType;
    /**
     * number of parameters should match the parameters embedded in the message
     */
    params?: string[];
};
/**
 * defines how the options for a named list is to be sourced at run time.
 */
export type ListSource = {
    name: string;
    okToCache: boolean;
    isKeyed: boolean;
    isRuntime: boolean;
    /**
     * relevant if this is not keyed
     * provided at design time, or cached if allowed
     */
    list?: SimpleList;
    /**
     * relevant if this is keyed
     * provided at design time, or cached if allowed
     */
    keyedList?: KeyedList;
};
/**
 * data needs to be moved around, possibly across networks and programming paradigms.
 * Hence a string, number and boolean are used to represent value for the sic value types.
 * Date is a string like "yyyy-mm-dd", and time stamp is a string like "yyyy-mm-ddThh:MM:ss.fffZ"
 */
export type Value = string | number | boolean;
/**
 * array of values. all elements of an array are of same type
 */
export type ValueArray = string[] | number[] | boolean[];
/**
 * name-value pairs of primitive values
 */
export type Values = StringMap<Value>;
export type AnyValue = Value | Values | ValueArray | Values[];
/**
 * Generic data structure that can represent arbitrary data organization inside of an object-structure.
 * That is, it is an object with name-value pairs. The value can be either a primitive value
 */
export type Vo = {
    [key: string]: AnyValue | Vo | Vo[];
};
export type BaseFormatter = {
    name: string;
    /**
     * mark-ups are value-markup pairs.
     * markup, in an html client, translates to a data-* attribute being set for the enclosing element
     * for a numeric/date type, the value may start with '<' or '>' followed by the value
     * for a text field it may start and end with '/', in which case, it is assumed to be
     * '' matches with undefined, while * matches for anything. It does not make sense to have any entries after a * entry
     * e.g. [['<0', 'negative'], ['>1000', 'high'], ['*' , 'normal']]
     */
    markups?: [string, string][];
};
/**
 * format a boolean for output
 */
export type BooleanFormatter = BaseFormatter & {
    type: 'boolean';
    trueValue: string;
    falseValue: string;
    unknownValue: string;
};
/**
 * format a number for output
 */
export type NumberFormatter = BaseFormatter & {
    type: 'number';
    /**
     * e.g. to output 001 instead of 1
     */
    minDigits?: number;
    /**
     * defaults to the one specified in the valueType or 0
     */
    nbrDecimals?: number;
    /**
     * 12,25,000 or 1,225,000
     */
    commas?: 'lakhs' | 'millions';
    /**
     * e.g. label says In crores, then the values are shown to nearest 1000
     */
    toNearest?: 'thousands' | 'lakhs' | 'millions' | 'crores';
};
/**
 * format a date for output
 */
export type DateFormatter = BaseFormatter & {
    type: 'date';
    format: string;
};
/**
 * format a timestamp for output
 */
export type TimestampFormatter = BaseFormatter & {
    type: 'timestamp';
    /**
     * defaults to locale of the client machine.
     * standard locale string
     */
    locale?: string;
    format?: string;
};
/**
 * format a text for output
 */
export type TextFormatter = BaseFormatter & {
    type: 'text';
    /**
     * x is substituted, while everything else is reproduced as it is
     * like xxx-xx-xxx.
     */
    format: string;
    /**
     * if you need to 'x-out' characters, then specify your choice of variable character
     */
    varchar?: string;
};
/**
 * If your need requires a custom function for formatting the value.
 */
export type CustomFormatter = {
    type: 'custom';
    /**
     * name of the formatter function provided by the app
     */
    function: string;
};
export type ValueFormatter = BooleanFormatter | CustomFormatter | DateFormatter | NumberFormatter | TextFormatter | TimestampFormatter;
/**
 * case may be converted to upper, lower.
 * A field name like "fieldName" or "FieldName" or "field_name" is converted to "Field Name"
 */
export type CaseConverter = 'UPPER' | 'lower' | 'label';
export type FormattedValue = {
    value: string;
    markups?: [string, Value][];
};
/**
 * function that formats a value to text format and provides rendering attributes to be set
 * used by the client to mark-up a value being rendered.
 */
export type FormatterFunction = (value: Value) => FormattedValue;
/**
 * how to render a value, generally as a column in a table, but also can be used to render as a field
 */
export type ColumnDetails = {
    /**
     * name by which the values are available in a row
     */
    name: string;
    /**
     * header label to be used
     */
    label: string;
    /**
     * value type helps is rendering, specifically, numbers may have to be right-justified
     */
    valueType: ValueType;
    /**
     * way to render the value. this is the name of a pre-defined formatter
     */
    valueFormatter?: string;
    /**
     * In case the value is internal, and a suitable label/text is to be rendered.
     * On the lines of a drop-down field. Map of internal value to the text to be rendered
     */
    valueList?: StringMap<string>;
    /**
     * action to be taken when user clicks on this value
     */
    onClick?: string;
    /**
     * very special case where this is not a field, but is a static view-component to be rendered, not a text to be rendered
     */
    comp?: StaticComp | Button;
};
export type VisualWidth = number;
/**
 * field name and sort order
 */
export type SortBy = {
    field: string;
    descending?: boolean;
};
/**
 * a condition is like "field-1 != 33" or "field1 > field2 but < field3
 */
export type FilterCondition = {
    /**
     * name of the field used for filtering
     */
    field: string;
    /**
     * defaults to Equals ('=')
     */
    comparator?: Comparator;
    /**
     * Defaults to the value of the named field.
     * Not relevant for hasValue ('#') and hasNoValue ('!#') operators.
     * value must be of the right type for the field and the comparator
     * use ${field-name} notation if the value comes from a different field.
     * e.g. amount="${value}".
     *
     * Note that the value is picked-up at the client-side at run time.
     */
    value?: Value;
    /**
     * required if the operator is between/range. ignored otherwise
     * Use ${field-name} to pick-up the value at rune time on the client-side
     */
    toValue?: Value;
    /**
     * set this to true if the value is required.
     * It is considered to be an error if a value is not found for the ${field-name} at run time
     */
    isRequired?: boolean;
};
/**
 * comparators for forming conditions like id = '1234'
 */
export type Comparator = '=' | '!=' | '<' | '<=' | '>' | '>=' | '><' | '^' | '~' | '#' | '!#';
export type AlertType = 'success' | 'info' | 'warning' | 'error';
export type Alert = {
    type: AlertType;
    text: string;
};
/**
 * spec for an interface. contains all the test descriptions for each method.
 * can be used for it(...)
 */
export type Spec = {
    [method: string]: string[];
};
