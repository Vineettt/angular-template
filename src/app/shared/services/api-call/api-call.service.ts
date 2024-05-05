import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIRequestPayload, HttpMethod } from './api-call';
import { AppInjector } from 'src/app/app.module';
import { StorageService } from '../storage/storage.service';
import { StorageKey } from 'src/assets/enums/storage-key';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  [x: string]: any;

  authToken!: any;

  __http: HttpClient;

  __storageService: StorageService;

  constructor() {
    this.__http = AppInjector.get(HttpClient);
    this.__storageService = AppInjector.get(StorageService);
  }

  callService(requestPayload: APIRequestPayload): Observable<any> {
    let endpoint = requestPayload?.endpoint;
    let method = requestPayload?.method;
    let body = requestPayload?.body;

    const url = `${environment.endpoint}/api/${endpoint}`;
    const token = this.__storageService.getItem(StorageKey.TOKEN);

    let header: any = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'accept-language': 'eu',
    };
    if (token) {
      header['Authorization'] = this.authToken;
    }

    const headers = new HttpHeaders(header);

    switch (method) {
      case HttpMethod.GET:
        return this.__http.get(url, { headers });
      case HttpMethod.POST:
        return this.__http.post(url, body, { headers });
      case HttpMethod.PUT:
        return this.__http.put(url, body, { headers });
      case HttpMethod.DELETE:
        return this.__http.delete(url, { headers });
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
}
