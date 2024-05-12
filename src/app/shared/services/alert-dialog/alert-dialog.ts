import { AlertButtonConfig } from 'src/assets/enums/alert-modal';

export class AlertDialogPayload {
  message!: string;
  key!: string;
  buttonConfigs: Array<AlertButtonConfig> | null = null;
  closeOtherPopup: boolean = false;
  title!: string;
}
