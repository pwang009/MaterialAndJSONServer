import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost:5001/enquiry";

  constructor(private http: HttpClient) { }

  createUser(registerObj: User) {
    return this.http.post<User>(this.baseUrl, registerObj);
  }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  updateUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj);
  }

  deletUser(id: number){
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

}
