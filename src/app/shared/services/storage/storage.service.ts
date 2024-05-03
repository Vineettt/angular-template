import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
 
  constructor() {}
  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item && this.isJsonString(item) ? JSON.parse(item) : item;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  removeSessionToken(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  getItemSessionStorage(key: string) {
    const item = sessionStorage.getItem(key);
    return item && this.isJsonString(item) ? JSON.parse(item) : item;
  }

  setItemSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  isJsonString(str:any) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

}
