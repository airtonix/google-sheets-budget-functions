export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu("Budget Functions")
    .addItem("Add Multiselect", "OpenTagPickerSidebar");

  menu.addToUi();
};
