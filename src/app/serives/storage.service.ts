import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  public save(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public load(key: string): null | any {
    let data = localStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  }
}
