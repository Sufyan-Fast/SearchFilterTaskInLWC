import { LightningElement } from "lwc";
import { track } from "lwc";
import getContactDetails from "@salesforce/apex/ContactsLoader.getContactDetails";

export default class InputComponent extends LightningElement {
  searchText;
  groupFilterText;
  checkbox = true;
  @track value;
  @track selectedVal;
  @track options;
  @track error;
  @track tableValues;

  //function for custom event from the child component
  handleDataValueChange(event) {
    this.value = event.detail;
  }

  //function for custom event that initialize the tableValues variable with all contact records
  handleFunctionForOneTimeDataTable(event) {
    this.tableValues = event.detail;
  }

  //function that sets all checkbox true when input search field is empty.
  handleInputChange(event) {
    this.searchText = event.target.value;
    if (!this.searchText) {
      this.value = this.tableValues;
      this.checkbox = true;
      this.selectedVal = "";
    }
  }

  //function that search the record when user enter value in search input field
  keyCheck(event) {
    let groupFilter = [];
    if (event.which == 13) {
      this.selectedVal = "";
      this.checkbox = false;
      groupFilter = this.groupFilterText ? [...this.groupFilterText] : [];

      let filterValue = JSON.parse(
        JSON.stringify(this.groupFilterText ? [...this.groupFilterText] : [])
      );
      let searchWord = this.searchText;

      //conditions for prevent duplicate values in checkbox filter
      let obj = filterValue.every((value) => {
        if (value.value === searchWord) {
          return false;
        }
        return true;
      });

      if (obj) {
        groupFilter.push({
          label: this.searchText,
          value: this.searchText
        });
      }

      this.groupFilterText = groupFilter;
      this.selectedVal = this.searchText;

      this.options = groupFilter;
      this.searchRecord(this.searchText);
    }
  }

  //function for searching the record
  searchRecord(searchRecord) {
    getContactDetails({ name: searchRecord })
      .then((result) => {
        this.value = result;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.value = undefined;
      });
  }
}
