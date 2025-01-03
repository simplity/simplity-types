import {
  AppController,
  DetailedMessage,
  FormController,
  KeyedList,
  PageController,
  ServiceResponse,
  SimpleList,
  ValueType,
} from '..';

/**
 * entity string index
 */
export type StringMap<T> = { [name: string]: T };

/**
 * Technique to incorporate condition like (one of a,b, or c must be specified)
 */
export type OneOf<T> = {
  [K in keyof T]: { [P in K]: T[K] } & Partial<
    Record<Exclude<keyof T, K>, never>
  >;
}[keyof T];
/**
 * function type. type alias "FunctionDetails" defines the signature of each of these types
 */
export type FunctionType =
  | 'global'
  | 'page'
  | 'form'
  | 'value'
  | 'request'
  | 'response'
  | 'format';

/**
 * A global function that is accessible at the app level.
 *
 * @param ac: the app controller
 * @param params: additional parameters passed to the function
 * @param msgs array to which the function can add messages that may be passed on to the UX
 * @returns any. In some situations the return value may also be checked for truthy/falsy to trigger events like onsuccess etc..
 */
export type GlobalFunction = (
  ac: AppController,
  params: unknown,
  msgs: DetailedMessage[]
) => unknown;

/**
 * A function that is to be triggered on some event. This is executed with page as the context.
 *
 * @param pc: the page controller used by this page
 * @param params: optional parameters for this function. If used, this is typically an object with name-value pairs.
 * onChange and OnChanging event call-back functions receive an object with {fieldName, value, event} attributes
 * @param msgs array to which the function can add messages that may be passed on to the UX
 * @returns any. In some situations the return value may also be checked for truthy/falsy to trigger evens like onsuccess etc..
 */
export type PageFunction = (
  pc: PageController,
  params: unknown,
  msgs: DetailedMessage[]
) => unknown;

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
export type FormFunction = (
  fc: FormController,
  param: unknown,
  msgs: DetailedMessage[]
) => unknown;

/**
 * a function that is triggered just before requesting a service using a ServiceAction.
 * This is an intercept function that can either modify the payload for the request, or abort the request with an error message.
 * @param fc controller of the form being submitted. Note that the PageController is accessible from this.
 * @param payload that accompanies the request.
 * @param msgs array to which the function should add messages in case the request is to be aborted
 * @returns true to say OK for the request. false to abort the request.
 */
export type RequestFunction = (
  fc: FormController,
  payload: Vo | undefined,
  msgs: DetailedMessage[]
) => boolean;

/**
 * An intercept function that is triggered after the response is received for an ServiceAction,
 * but before the serviceResponse is processed by the controller.
 * @param pc page controller
 * @param response serviceResponse that may be modified by this function
 */
export type ResponseFunction = (
  pc: PageController,
  response: ServiceResponse
) => void;

/**
 * A form validation functions returns an array of messages in case of validation errors, or undefined if there are no errors
 */
export type FormValidationFunction = (
  fc: FormController
) => [{ fieldName: string; message: string }] | undefined;

/**
 * function to format the value for output.
 * It can also set the mark-up attributes for the view-element
 * @param value
 */
export type FormatterFunction = (
  value: Value,
  row: Values
) => { value: string; markups: Markups };

export type FunctionDetails =
  | { type: 'global'; fn: GlobalFunction }
  | { type: 'request'; fn: RequestFunction }
  | { type: 'response'; fn: ResponseFunction }
  | { type: 'page'; fn: PageFunction }
  | { type: 'form'; fn: FormFunction | FormValidationFunction }
  | { type: 'value'; fn: ValueValidationFn }
  | { type: 'format'; fn: FormatterFunction };

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
export type ValueValidationFn = (
  /** non-empty */ value: string
) => ValueValidationResult;
/**
 * data-structure returned by a validation function.
 * value is undefined if the string could not be parsed into the right type
 */
export type ValueValidationResult =
  | {
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
    }
  | { value: Value; messages?: ValidationMessage[] }; //ensuring that value is non-undefined when messages is undefined

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
 * name-value pairs
 */
export type Values = StringMap<Value>;

export type AnyValue = Value | Values | ValueArray | Values[];

/**
 * generic data-structure that is used to get data from the server.
 * Note that Value[] is not allowed.
 */
export type Vo = {
  [key: string]: AnyValue | Vo | Vo[];
};

export type ValueFormatter = {
  /**
   * for text
   */
  casing?: CaseConverter;
  /**
   * e.g. to output 001 instead of 1
   */
  minDigits?: number;
  /**
   *million -> comma for every three digits
   crore -> indian commas
   xxx-xx-xxxx- -> for text formatting with special characters. anything other than x is a formatting character
   yyyy-mm-dd etc.. case insensitive. yy, yyyy, mm, dd, mmm (for JAN etc..) have fixed meaning. others are separators
   */
  separators?: 'million' | 'crore' | string;
  /**
   * 1000 means up to nearest 1000
   */
  roundUpTo?: number;
};
/**
 * case may be converted to upper, lower.
 * A field name like "fieldName" or "FieldName" or "field_name" is converted to "Field Name"
 */
export type CaseConverter = 'UPPER' | 'lower' | 'label';

/**
 * function that formats a value to text format and provides rendering attributes to be set
 * used by the client to mark-up a value being rendered.
 */
export type FormatterFn = (value: Value) => {
  value: string;
  attrs?: Markups;
};

/**
 * Markup attributes are name-value pairs.
 * name is the name of a mark-up, like "highlight", "below-range" etc..
 * a mark-up is set as a data-* attribute for the element.
 * e.g. data-highlight of data-align=right
 */
export type Markups = StringMap<string>;

/**
 * how to render a value, generally as a column in a table, but also can be used to render as a field
 */
export type ValueRenderingDetails = {
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
   * attributes data-* to be set for the header cells. This is the technique we use to associate effective style for the cell
   */
  labelAttributes?: Markups;
  /**
   * way to render the value. this is the name of a pre-defined formatter
   */
  valueFormatter?: ValueFormatter;
  /**
   * name of a pre-defined formatter-function
   */
  valueFormatterFn?: string;
};

/**
 * 0 implies default or not-applicable depending on the context
 */
export type NbrCols = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/**
 * -1 means first/last element
 */
//type Gap = -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * As of now, our width management is quite primitive.
 * Page has 12 columns. A leaf element consumes 4 units by default.
 * That is to say that the leaf elements will be rendered as 3 per row.
 * A container-child by default will have "full" width, meaning that it will be of the same width as its parent.
 * Note that the width of a leaf element is always relative to the 12 units at the page level, and not based on its parent's width.
 *
 */
//export type VisualWidth = {
/**
 * defaults to 'all' for a container, 4 for a leaf.
 */
//  width?: NbrCols;
/**
 * gap on the left. -1 means should start on the next row
 */
//  gapLeft?: Gap;
/**
 * gap on the right. -1 means next one should start on the next row
 */
//  gapRight?: Gap;
//};

export type VisualWidth = NbrCols;

/**
 * field name and sort order
 */
export type SortBy = { field: string; descending?: boolean };

/**
 * a condition is like "field-1 != 33" or "field1 > field2 but < field3
 */
export type FilterCondition = {
  /**
   * name of the field used for filtering
   */
  field: string;
  comparator: Comparator;
  /**
   * value must be of the right type for the field and the comparator
   * use ${field-name} notation to refer to another field instead of a value.
   * e.g. value="${price}"
   */
  value: string | number | boolean;

  /**
   * required if the operator is between/range. ignored otherwise
   */
  toValue?: string | number;
};

/**
 * comparators for forming conditions like id = '1234'
 */
export type Comparator =
  | '='
  | '!='
  | '<'
  | '<='
  | '>'
  | '>='
  | '><'
  | '^'
  | '~';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export type Alert = {
  type: AlertType;
  text: string;
};

/**
 * spec for an interface. contains all the test descriptions for each method.
 * can be used for it(...)
 */
export type Spec = { [method: string]: string[] };
