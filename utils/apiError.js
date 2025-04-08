class ApiError {
  constructor(statusCode, message, data, errors = []) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;
  }
}

export { ApiError };
