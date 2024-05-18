import { AlertButtonConfig } from 'src/assets/enums/alert-modal';

export class AlertDialogPayload {
  message!: string;
  key!: string;
  buttonConfigs: any = [];
  closeOtherPopup: boolean = false;
  title!: string;
}
