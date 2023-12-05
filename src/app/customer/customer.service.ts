import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl:string = "  http://localhost:3000/clients"

  constructor(public http:HttpClient) { }

  loadClientDetails():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseUrl)
  }

  createClientDetails(client:any):any {
    return this.http.post(this.baseUrl,client)
  }

  updateClientDetails(client:any):any {
    return this.http.put(this.baseUrl + "/" + client.id, client)
  }

  deleteClientDetails(cid:any):any {
    return this.http.delete(this.baseUrl + "/" + cid)

  }
}
