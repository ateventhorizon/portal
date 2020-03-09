export class apiStatus {
  constructor(code, msg = "") {
    this.status = {
      code: code,
      msg: msg
    }
  }

  get getStatus() {
    return this.status;
  }

  get isSuccessful() {
    return this.status.code >= 200 && this.status.code < 400;
  }

  get failed() {
    return !this.isSuccessful;
  }

  get msg() {
    return this.status.msg;
  }

  get code() {
    return this.status.code;
  }

}

export const apiStatusResponse = (status, statusMessage) => {
  return new apiStatus(status, statusMessage);
};

export const isStatusCodeSuccessful = code => {
  return code >= 200 && code < 400;
}

export const isStatusCodeAny400 = code => {
  return code >= 400 && code < 500;
}
