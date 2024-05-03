export class AlertButtonConfig {
  buttonName!: string;
  buttonType!: string;
  buttonText!: string;
  buttonStatus!:string;
}

export enum AlertModalButtonNameEnum {
  OK = 'ok',
  CANCEL = 'cancel',
  YES = 'yes'
}

export enum AlertModalButtonTextEnum {
  OK = 'ok',
  CANCEL = 'cancel',
  YES = 'yes'
}

export enum AlertModalButtonTypeEnum {
  ACCEPT = 'accept',
  CUSTOM = 'custom',
}
