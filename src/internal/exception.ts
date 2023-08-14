class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

export class ResponseError extends BaseError {
  constructor(public statusCode: number, e?: string) {
    super(e);
  }
}

export class NetworkAccessError extends BaseError {}
