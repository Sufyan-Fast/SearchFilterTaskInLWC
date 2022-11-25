public with sharing class ContactsLoader {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts() {
    List<Contact> contacts = [SELECT Id, Name, Phone, Email FROM Contact];

    return contacts;
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactDetails(String name) {
    String searchString = '%' + name + '%';
    List<Contact> contactDetails = [
      SELECT Id, Name, Phone, Email
      FROM Contact
      WHERE FirstName LIKE :searchString OR LastName LIKE :searchString
    ];
    return contactDetails;
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactDetailsFilter(List<String> name) {
    List<Contact> contactDetailsList = [
      SELECT Id, Name, Phone, Email
      FROM Contact
      WHERE FirstName LIKE :name OR LastName LIKE :name
    ];
    return contactDetailsList;
  }
}
