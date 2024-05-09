import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';
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
    console.log(event);

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
        this.__appLoadService.storeUserData(res.user,res.token);
        this.__appLoadService.permissions = res?.user?.permission;
        this.__router.navigate(['dashboard']);
        location.reload();
      },
      error: (err: any) => {
        // console.clear();
        console.log(err);
      },
      complete: () => {},
    });
  }
}
