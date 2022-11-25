import { LightningElement } from "lwc";
import { api } from "lwc";
import getContactDetailsFilter from "@salesforce/apex/ContactsLoader.getContactDetailsFilter";

export default class CheckBoxesFilter extends LightningElement {
  ListValue;
  @api tableData;
  @api value;
  @api checkBoxValue;
  @api selectedVal;
  @api options;

  //function that handle actions for All checkbox field
  oncheck(event) {
    this.checkBoxValue = event.target.checked;
    if (this.checkBoxValue) {
      this.value = this.tableData;
      const selectedEvent = new CustomEvent("datavaluechange", {
        detail: this.value
      });

      this.dispatchEvent(selectedEvent);
      this.selectedVal = "";
    } else {
      this.value = "";
      const selectedEvent = new CustomEvent("datavaluechange", {
        detail: this.value
      });

      this.dispatchEvent(selectedEvent);
    }
  }

  //function that handle actions for group filter checkbox
  handleChange(event) {
    this.selectedVal = "";
    this.checkBoxValue = false;
    let selectedValues = event.detail.value;
    this.selectedVal = selectedValues;
    let filtersList = JSON.parse(JSON.stringify(selectedValues));
    let stringSearch = [];
    filtersList.forEach((obj) => {
      stringSearch.push("%" + obj + "%");
    });

    this.ListValue = stringSearch;

    if (filtersList) {
      this.searchRecordOnFilter(this.ListValue);
    } else {
      this.value = "";
      const selectedEvent = new CustomEvent("datavaluechange", {
        detail: this.value
      });

      this.dispatchEvent(selectedEvent);
    }
  }

  //function that search values for the group filter checkboxes
  searchRecordOnFilter(SearchList) {
    getContactDetailsFilter({ name: SearchList })
      .then((result) => {
        this.value = result;
        this.error = undefined;
        const selectedEvent = new CustomEvent("datavaluechange", {
          detail: this.value
        });

        this.dispatchEvent(selectedEvent);
      })
      .catch((error) => {
        this.error = error;
        this.value = undefined;
      });
  }
}
