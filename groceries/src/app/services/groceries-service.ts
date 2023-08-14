// groceries.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  private apiUrl = 'https://localhost:8100'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  addItem(item: { name: string; quantity: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, item);
  }

  editItem(index: number, item: { name: string; quantity: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${index}`, item);
  }

  removeItem(index: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${index}`);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`);
  }
}
