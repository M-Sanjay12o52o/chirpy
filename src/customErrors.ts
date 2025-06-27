export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// 400
// export class BadRequestError extends Error {
export class BadRequestError extends CustomError {
  // statusCode: number;
  statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    // this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

// 401
// export class UnauthorizedError extends Error {
export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    // this.statusCode = 401;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

// 403
// export class ForbiddenError extends Error {
export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
    // this.statusCode = 403;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

// 404
// export class NotFoundError extends Error {
export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    // this.statusCode = 404;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
