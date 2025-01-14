/**
 * to be used only by design-time utilities to check if all the required templates are supplied or not
 */
export declare const predefinedHtmlTemplates: readonly ["button", "check-box", "content", "dialog", "image-field", "image", "layout", "line", "list", "menu-group", "menu-item", "output", "page", "page-panel", "panel-grid", "panel", "password", "select-output", "select", "snack-bar", "tab", "table-editable", "table", "tabs", "text-area", "text-field"];
export type HtmlTemplateName = (typeof predefinedHtmlTemplates)[number];
