import { LightningElement } from "lwc";
import { wire, api } from "lwc";
import getContacts from "@salesforce/apex/ContactsLoader.getContacts";

const columns = [
  { label: "Name", fieldName: "Name", type: "Name" },
  { label: "Email", fieldName: "Email", type: "Email" },
  { label: "Phone", fieldName: "Phone", type: "Phone" }
];
export default class LightningTable extends LightningElement {
  columns = columns;
  values;
  error;

  @api getValueOfData;

  //wire function that runs automatically and get all records of contacts object from salesforce
  @wire(getContacts)
  getContactsCallBack(response) {
    const { error, data } = response;
    if (data) {
      this.getValueOfData = data;
      const EventSend = new CustomEvent("onetimefunction", {
        detail: data
      });
      this.dispatchEvent(EventSend);
    }
  }
}
