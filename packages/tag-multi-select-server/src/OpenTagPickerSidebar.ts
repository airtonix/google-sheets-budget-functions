export const OpenTagPickerSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile(
    "packages/tag-multi-select-ui/dist/tag-multi-select-ui-page"
  );
  SpreadsheetApp.getUi().showSidebar(html);
};
