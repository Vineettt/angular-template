export class AlertButtonConfig {
  buttonName!: string;
  buttonType!: string;
  buttonText!: string;
  buttonStatus!:string;
  buttonColor !:string;
}

export enum AlertModalButtonEnum {
  OK = 'OK',
  CANCEL = 'CANCEL',
  YES = 'YES'
}