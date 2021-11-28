import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
Allcountries:any = [];
Allstate:any = [];
Allcurrencies:any = [];
SingleCurrency: any =[]
Allcities: any =[]
ifError: boolean = false;
errorMessage: any
isloading: boolean = true
  constructor(private apiServices: ApiService, private route: Router) { }

  ngOnInit(): void {
    // get all countries
    this.apiServices.getByUrls('http://localhost:3000/v/oper/getcounties')
    .then(result => {
      this.Allcountries  = result;  
      this.isloading = false    
    }).catch(err => {
      this.ifError = true;
      this.errorMessage = err.error
      console.log(this.errorMessage);
      
      this.isloading = false
    })
    // get currencies
    this.apiServices.getByUrls('http://localhost:3000/v/oper/getcurrencies')
    .then(result => {
      this.Allcurrencies  = result;
    }).catch(err => {
     this.ifError = true;
    })

  }
  myFunc(val:any){
    this.apiServices.getByUrls('http://localhost:3000/v/oper/getstate/'+val)
    .then(result => {
      this.Allstate  = result;
      console.log(result);
      
    }).catch(err => {
      console.log(err);
      (err)
    })
  }

  getcity(country:any,state:any){
    this.apiServices.getByUrls('http://localhost:3000/v/oper/'+country+'/'+state)
    .then(result => {
      this.Allcities  = result;
      console.log(result);
      
    }).catch(err => {
      console.log(err);
      (err)
    })
  }

  getcurrency(val:any){
    this.apiServices.getByUrls('http://localhost:3000/v/oper/getcurrency/'+val)
    .then(result => {
      this.SingleCurrency  = result;
      console.log(result);
      
    }).catch(err => {
      console.log(err);
      (err)
    })
  }

}

