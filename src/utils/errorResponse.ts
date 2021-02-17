class ErrorResponse extends Error {
  statusCode: number;

  data: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data || {};
  }
}

export default ErrorResponse;
