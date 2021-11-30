import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../shared/api.service';
declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customerForm!: FormGroup
  isSubmitted  =  false
  constructor(private fb: FormBuilder,private apiservice: ApiService,private authservice: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.formValidate()
  }

  login(){
    if (this.authservice.iscusomerlog()) {
      this.router.navigateByUrl('/sendmoney')
      
    }else{
    $("#modal").modal('show')
    }
  }

  formValidate(){
    this.customerForm  =  this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  checkCustomer(){
    this.isSubmitted = true
    if (this.customerForm.valid) {
     this.apiservice.postByUrls('http://localhost:3000/v/cus/login',this.customerForm.value)
     .then(result => {
       const info = result;
       this.authservice.customerInfo(info)
       $("#modal").modal('hide')
       this.router.navigateByUrl('sendmoney')
     }).catch(error => {
       console.log(error.error);
       
     })
      
    }

  }

}
