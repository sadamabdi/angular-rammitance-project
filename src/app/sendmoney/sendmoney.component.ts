import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.css']
})
export class SendmoneyComponent implements OnInit {
  sendMoneyForm!: FormGroup
  Sender: any = []
  RecieverUser: any = []
  isSubmitted:boolean =false
  customerName:any
  customerid:any
  recieverInfo:any = []
  rate:any
  currencyCode:any
  charge:any
  payment:any  = []
  status: any = []
  transactions:any = []
  spinner:boolean = false;
  constructor(private authservice: AuthService,private apiService: ApiService,private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    if (!this.authservice.iscusomerlog()) {
      this.router.navigateByUrl('/')
      return;
    }
    this.currencyCode = "USD"
    // this.formValidation();
    const data:any = this.authservice.getCustomerInfo()
    this.Sender = JSON.parse(data);
    this.customerid = this.Sender.data[0].customerid;
    this.customerName = this.Sender.data[0].customername;
    // this.sendMoneyForm.controls['sendercus'].setValue(this.customerid)
    console.log(this.customerName);
    
    this.apiService.getByUrls('http://localhost:3000/v/cus/getCustomer/'+this.customerid+'/no')
    .then(result => {
      this.RecieverUser = result;
       
    }).catch(error => console.log(error))

    this.formValidation()
    this.getpayment()
    this.getstatus();
    this.sendMoneyForm.controls['sendercus'].setValue(this.customerid)
     
  }

  formValidation(){
    this.sendMoneyForm = this.fb.group({
     
      reciever: ['',Validators.required],
      amount :['',Validators.required],
      convertedamount: ['', Validators.required],
      chargeamount: [''],
      payment: ['', Validators.required],
      status: ['', Validators.required],
       sendercus: [''],
    })
  }

  getRecieverinfo(id:any){
    this.apiService.getByUrls('http://localhost:3000/v/cus/getCustomer/'+id+'/equal')
    .then(result => {
      this.rate = result.data[0].rates;
      this.currencyCode = result.data[0].currency_code;
       console.log(result);
       
    }).catch(error => console.log(error))
    
  }

  onKey(event:any){
    const val = event.target.value;
    const multip = val * this.rate
    // console.log(multip);
    this.charge = (val*0.1).toFixed(2)
    this.sendMoneyForm.controls['convertedamount'].setValue(multip.toFixed(2))
    this.sendMoneyForm.controls['chargeamount'].setValue(this.charge)
  }


  senMoney(){
    this.isSubmitted = true;
    if (this.sendMoneyForm.valid) {
    this.apiService.postByUrls('http://localhost:3000/v/ramit/createRamittance',this.sendMoneyForm.value)
    .then(result => {
      console.log(result);
      
    }).catch(error => console.log(error))  
    }

  }


  getpayment() {
    this.apiService.getByUrls('http://localhost:3000/v/oper/getpayments')
    .then(result => {
      this.payment = result;
      console.log(result);
      
    })  
  }
 
  getstatus() {
    this.apiService.getByUrls('http://localhost:3000/v/oper/getstatus')
    .then(result => {
      this.status = result;
      console.log(result);
      
    })  
  }

  logoutcustomer(){
   this.authservice.customerLogOut();
   this.router.navigateByUrl('/')
  }

  getTransaction(){
    this.spinner = true;
    this.apiService.getByUrls('http://localhost:3000/v/ramit/transaction/'+this.customerid)
    .then(result => {
      console.log(result);
      this.transactions =result;
       $("#modal").modal('show')
       this.spinner = false;
      
    })
    
  }

}
