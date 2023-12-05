import { Component,OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import {FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  clientRef = new FormGroup ({
    id : new FormControl(),
    clientname: new FormControl(),
    businescategory: new FormControl(),
    address: new FormControl(),
    contactperson: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  })

  createBtn:string = "Create"

  customers:Array<Customer> = []

  constructor(public customerService:CustomerService){}

  ngOnInit(): void {
    this.loadAllClient()
  }

  loadAllClient() {
    this.customerService.loadClientDetails().subscribe({
      next:(result:any)=> {
        this.customers=result;
    },
    error:(error:any)=> {
        console.log(error)
    },
    complete:()=> {
        console.log("done!")
    }
    })
  }

  createClient() {
    let client = this.clientRef.value

    if(this.createBtn == "Create") {
      this.customerService.createClientDetails(client).subscribe({
        next:(result:any) => {
          console.log(result)
        },
        error:(error:any) => {
          console.log(error)
        },
        complete:() => {
          this.loadAllClient()
        }
      })
    } else {
      this.customerService.updateClientDetails(client).subscribe({
        next:(result:any) => {
          console.log(result)
        },
        error:(error:any) =>{
          console.log(error)
        },
        complete:() =>{
          this.loadAllClient()
        }
      })
      this.createBtn = "Create"
    }
    this.clientRef.reset()


  }

  

  updateClient(client:any):void {
    console.log(client)
    this.clientRef.get("id")?.setValue(client.id)
    this.clientRef.get("clientname")?.setValue(client.clientname)   
    this.clientRef.get("businescategory")?.setValue(client.businescategory)
    this.clientRef.get("address")?.setValue(client.address)
    this.clientRef.get("contactperson")?.setValue(client.contactperson)
    this.clientRef.get("email")?.setValue(client.email)
    this.clientRef.get("phone")?.setValue(client.phone)
    this.createBtn = "Update Client"

  }


  deleteClient(cid:any) {
    return this.customerService.deleteClientDetails(cid).subscribe({
      next:(result:any)=> {
        console.log(result)
      },
      error:(error:any)=> {
        console.log(error);
      },
      complete:()=> {
        this.loadAllClient();
      }
    })

  }

}
