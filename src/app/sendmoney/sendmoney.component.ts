import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

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
  constructor(private authservice: AuthService,private apiService: ApiService,private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.formValidation();
    const data:any = this.authservice.getCustomerInfo()
    this.Sender = JSON.parse(data);
    this.customerid = this.Sender.data[0].customerid;
    this.customerName = this.Sender.data[0].customername;

    console.log(this.customerName);
    
    this.apiService.getByUrls('http://localhost:3000/v/cus/getCustomer/'+this.customerid+'/no')
    .then(result => {
      this.RecieverUser = result;
       
    }).catch(error => console.log(error))
     
  }

  formValidation(){
    this.sendMoneyForm = this.fb.group({
      reciever: ['',Validators.required],
      amount :['',Validators.required],
      convertamount: ['', Validators.required]
    })
  }

  getRecieverinfo(id:any){
    console.log(id);
  }

  onKey(event:any){
    console.log(event.target.value);
    
  }


  senMoney(){
    this.isSubmitted = true;
    if (this.sendMoneyForm.valid) {
      console.log("is ok");
      
      
    }

  }

}
