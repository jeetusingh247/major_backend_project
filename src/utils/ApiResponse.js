class ApiResponse { // Class to handle API responses
  constructor(status, message="Success", data) { // Constructor to initialize the class
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status >= 200 && status < 300; // Check if the status code is a success code
  }
}