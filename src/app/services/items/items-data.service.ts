import { Items } from '../../models/item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {
getUrl = 'https://localhost:44311/api/Items';
postUrl = 'https://localhost:44311/api/Items';
  constructor(private http: HttpClient) { }
  getItems() {
    return this.http.get<Items[]>(this.getUrl);
  }

  createItems(items: Items) {
    return this.http.post(this.postUrl, items );
  }
}
