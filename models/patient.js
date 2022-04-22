class Patient {
  constructor(
    id,
    firstName,
    lastName,
    address,
    age,
    phoneNumber,
    diagnostic,
    createdDate,
    status
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.diagnostic = diagnostic;
    this.createdDate = createdDate;
    this.status = status;
  }
}

module.exports = Patient;
