import {
  Alert,
  BaseComponent,
  Button,
  DataField,
  FormController,
  Page,
  Panel,
  SimpleList,
  StaticComp,
  StringMap,
  Tab,
  TableEditor,
  TableViewer,
  Tabs,
  Value,
  Values,
} from '../..';

/**
 * An App-view is the outer most container component inside of which the relevant view components are laid out
 * When an AppView instance is created, it should not have any child layouts in that.
 * a LayoutView will be added later by the app controller
 */
export interface AppView {
  /**
   * creates, adds and renders a layoutView as its only child, if required. View is NOT created if the index.html already has the layout rendered.
   * (layoutIsEmbedded mode)
   * NOTE: document.createElement of standard DOM just creates an element, but it does not add it to the DOM.
   * This method adds the created element as its only child element, after deleting the existing on if any.
   * @param layout required, even if the layout view is embedded into the html.
   * @param startWith module to start with. defaults to the first one in the layout
   * @returns layoutView component
   *
   */
  //renderLayout(layout: Layout, startWith: string): LayoutView;

  /**
   * show a message as per the chosen design to show/flash message in a non-intrusive way
   * @param alert
   */
  showAlert(alert: Alert): void;

  /**
   * Show a message/question to get user's response/choice
   * @param text message text to be shown
   * @param choices options to be shown as buttons to choose from
   * @returns 0-based index of the option chosen by the user
   */
  getUserChoice(text: string, choices: string[]): Promise<number>;

  /**
   * render a panel as pop-up. the panel should not be part of the dom.
   * this method adds the panel to the dom.
   * Note that this method is for a panel, and NOT for a page. a popup page is handled through regular navigation action
   * @param panel to be rendered. It should not be part of the DOM.
   */
  renderAsPopup(panel: PanelView): void;

  /**
   * closes the panel by removing it from dom.
   * This method is to be called after a call to renderAsPopup.
   * no error is thrown if there was no panel was rendered as a popup
   */
  closePopup(): void;

  /**
   * navigate to the desired page based on the details in this action
   * @param options page and other details
   */
  navigate(options: NavigationOptions): void;
  /**
   * It is possible that a layout shows the page title outside of the page area.
   * this method is to be called to set the title. Note that this is NOT the title of the window
   * @param title
   */
  renderPageTitle(title: string): void;

  /**
   * layout may display some details like logged-in user etc..
   * @param values
   */
  renderContextValues(values: StringMap<string>): void;
}

export type NavigationOptions = {
  /**
   * if this is true, other parameters have no meaning.
   */
  closePage?: boolean;
  /**
   * defaults to current
   */
  layout?: string;
  /**
   * defaults to default in the new layout, or the current module if layout is not changed
   */
  module?: string;
  /**
   * default from the module if this is omitted
   */
  menuItem?: string;
  params?: Values;
  /**
   * if true, then the current page is not deleted, and saved on a stack
   */
  retainCurrentPage?: boolean;
  /**
   * new page is rendered as modal on the current page.
   */
  asModal?: boolean;
  /**
   * whether existing pages on the stack are to be deleted
   */
  purgePageStack?: boolean;
};
/**
 * this is typically the only child of an AppView that would render all other components in a pre-defined layout.
 */
export interface LayoutView {
  // readonly layout: Layout;
  /**
   * html root should have the desired child elements like header,footer, modules, pageTitle etc.. with the right ID
   * layout View
   */
  //readonly root: HTMLElement;
  /**
   * render this module or the default/first module if module name is not specified.
   * the default page associated with the selected module should also be rendered (as if renderPage() is called)
   * @param moduleName to be selected and rendered. default module is used if this is skipped
   */
  //render(moduleName?: string): void;
  /**
   * render this page. It should first create an instance of the PageView, create a PageController using app.newPc() and then render the page contents
   * @param pageName
   */
  //renderPage(pageName: string, pageParams?: Values): void;
  /**
   * navigate to the desired page based on the details in this action
   * @param action page and other details
   */
  //navigate(action: NavigationAction): void;
  /**
   * It is possible that a layout shows the page title outside of the page area.
   * this method is to be called to set the title. Note that this is NOT the title of the window
   * @param title
   */
  //  renderPageTitle(title: string): void;
  /**
   * layout may display some details like logged-in user etc..
   * @param values
   */
  //  renderContextValues(values: StringMap<string>): void;
}

/**
 * A view component that renders menu groups.
 * A menu group has a list of Menu Items
 */
//export interface MenuGroupView extends BaseControl {}

/**
 * menu item is a clickable component that typically navigates the user to a specific page
 * a menu item may be rendered in more than one groups
 */
//export interface MenuItemView extends BaseControl {}

/**
 * Page View. Represents the view-component for a rendered page.
 */
export interface PageView {
  /**
   * meta data for this page
   */
  readonly page: Page;

  /**
   * run time parameters passed to this page
   */
  readonly params?: Values;

  /**
   * whether the page buttons are to be rendered or hidden
   * @param show true to show and false to hide
   * @returns
   */
  showButtons(toShow: boolean): void;

  /**
   * show alerts
   * @param alerts
   */
  alert(alerts: Alert[]): void;

  /**
   * disable user interaction.
   * Typically used during page loads/updates
   */
  disableUx(): void;

  /**
   * enable user interaction.
   * Typically used during page loads/updates
   */
  enableUx(): void;

  /**
   * invoked after this page view is integrated with the layout.
   * e.g. in html, this is called after the view is appended to the DOM.
   */
  pageLoaded(): void;
}

/**
 * Abstract/Base Control (a view-component that is part of a page)
 */
export interface BaseView {
  readonly name: string;
  readonly comp: BaseComponent;

  /**
   * set/reset an error message with this view-component. this
   *
   * @param error undefined means reset/remove any existing error message
   */
  setError(error: string | undefined): void;

  /**
   * A view-component may have certain display-states, like hidden etc..
   * To keep the concerns separated, view component should delegate the actual rendering to its rendering layer
   * for example, in HTML this would be with a style="display:none".
   * however, the view component MUST not do this. Instead it should delegate the how part.
   * thi can be done by setting a custom attribute like "data-hidden"
   *
   * @param name could be defined by  simplity, or a custom one implemented by the specific app
   * @param value appropriate value for this state
   */
  setDisplayState(name: string, value: string | number | boolean): void;
}

/**
 * controls that do not contain other controls
 */
export type LeafView = FieldView | ButtonView | StaticView;

export type ContainerView =
  | PanelView
  | TableViewerView
  | TableEditorView
  | TabsView;
/**
 * Field is a view control that is bound to a run-time data-element.
 * It may or may not be editable.
 */
export interface FieldView extends BaseView {
  /**
   * meta data for this button
   */
  readonly field: DataField;

  /**
   * value is coming from the top.
   * It is not invoked when the data is changed by the UX.
   * The value is to be set, and if required, to be propagated to the view.
   * @param value value
   */
  setValue(value: Value): void;

  /**
   * get the validation status of the field as updated when it was changed last.
   * a validation is not forced.
   * @returns true if this field is valid as of now. false otherwise.
   */
  isValid(): boolean;

  /**
   * force a fresh validation. This may be required if the validation may depend on things outside of the field value
   */
  validate(): boolean;
  /**
   * relevant if the field requires a list of enumerated values.
   * ignored with a warning if the control does not use a list of values
   * @param list list of valid options.
   */
  setList(list: SimpleList): void;

  /**
   * get the current value
   */
  getValue(): Value;
}

/**
 * A clickable button for user to ask for some action
 */
export interface ButtonView extends BaseView {
  /**
   * meta data for this button
   */
  readonly button: Button;
}

/**
 * A leaf control that is not bound to any data, but not a button
 */
export interface StaticView extends BaseView {
  /**
   * meta data for this button
   */
  readonly staticComp: StaticComp;
}

/**
 * panel is a container to render its child controls
 * it is a view component, and not a control, but is named that way for conformity with other similar components
 */
export interface PanelView extends BaseView {
  readonly panel: Panel;
  /**
   * in case this panel is associated with a child-form
   */
  readonly childFc?: FormController;
}

/**
 * Tab is a panel that is a direct child of a tabsGroup.
 */
export interface TabView extends BaseView {
  readonly tab: Tab;
}

/**
 * table renders tabular data, but does not allow any edits to the columns.
 * It can optionally have the facility to select a subset of rows.
 */
export interface TableViewerView extends BaseView {
  readonly table: TableViewer;
  /**
   * remove all rendered rows. Header, if any, is to be retained.
   */
  reset(): void;

  /**
   * render required rows for the incoming data-rows.
   * @param data
   * @param selectedNames if this is a configurable table, then this is required
   */
  renderData(data: Values[], selectedNames?: string[]): void;
}

/**
 * table renders tabular data, but does not allow any edits to the columns.
 * It can optionally have the facility to select a subset of rows.
 */
export interface TableEditorView extends BaseView {
  readonly table: TableEditor;

  /**
   * remove all rendered rows.
   */
  reset(): void;

  /**
   * append on row to the view
   * @param fc form controller that manages this row
   * @param rowIdx 0-based row index with which the row is to be marked with
   * @param values optional initial values for the fields.
   * If not specified, the defaultValue, if specified for that field, will be used as the initial value for a field
   */
  appendRow(fc: FormController, rowIdx: number, values?: Values): void;
}

/**
 * tab group is the container for tabs
 */
export interface TabsView extends BaseView {
  readonly tabs: Tabs;
  /**
   * set error status of a all tabs
   * @param errors must be of the right length for he tabs
   */
  setTabErrorStatus(errors: boolean[]): void;
}
