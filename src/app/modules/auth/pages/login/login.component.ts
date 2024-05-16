import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BasePageComponent,
  SnackBarPayload,
} from 'src/app/shared/elements/base-page/base-page.component';
import { AlertDialogPayload } from 'src/app/shared/services/alert-dialog/alert-dialog';
import {
  APIRequestPayload,
  Endpoint,
  HttpMethod,
} from 'src/app/shared/services/api-call/api-call';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends BasePageComponent implements OnInit {
  __emailInput: any = {
    id: 'email',
    element: 'input',
    type: 'text',
    required: true,
    label: 'Email',
    value: '',
  };

  __passwordInput: any = {
    id: 'password',
    element: 'input',
    type: 'password',
    required: true,
    label: 'Password',
    icon: 'key',
    value: '',
  };

  __submitButton: any = {
    id: 'submit',
    element: 'button',
    type: ButtonType.flat,
    label: 'Submit',
    color: Color.primary,
  };

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }

  valueChanged(event: any) {
    if (event.id === 'email') {
      this.__emailInput.value = event.value;
    }
    if (event.id === 'password') {
      this.__passwordInput.value = event.value;
    }
  }

  buttonOnClick(event: any) {
    if (
      this.__emailInput.value.trim().length === 0 ||
      this.__passwordInput.value.trim().length === 0
    ) {
      return;
    }
    const user = {
      email: this.__emailInput.value,
      password: this.__passwordInput.value,
    };

    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.POST;
    requestPayloadObject.endpoint = Endpoint.LOGIN;
    requestPayloadObject.body = user;

    this.__apiCallService.callService(requestPayloadObject).subscribe({
      next: (res: any) => {
        this.__appLoadService.storeUserData(res.user, res.token);
        this.__router.navigate(['dashboard']);
        let snackBarPayload = new SnackBarPayload();
        snackBarPayload.message = res.message;
        this.triggerSnackBar(snackBarPayload);
      },
      error: async (err: any) => {
        let payload = this.formatErrorMessage(err.error);
        if (payload?.status && payload?.type === 'error') {
          let alertDialogPayload = new AlertDialogPayload();
          alertDialogPayload.message = payload?.message;
          alertDialogPayload.key = payload?.key;
          alertDialogPayload.title = 'Alert';
          let rPayload = await this.__alertDialogService
            .popUp(alertDialogPayload)
            .toPromise();
        }
      },
      complete: () => {},
    });
  }

  iconClick(event: any) {
    if (event.id === 'password') {
      this.__passwordInput.type = event?.type === 'password' ? 'text' : 'password';
      this.__passwordInput.icon = event?.icon === 'key' ? 'key_off' : 'key';
    }
  }
}
