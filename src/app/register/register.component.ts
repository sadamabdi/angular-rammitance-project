import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  allCountries: any = []
  states: any = []
  cities: any = []
  countryvalue:any;
  messages:any = '';
  taskForm!: FormGroup;
  isSubmitted  =  false;
  constructor(private apiServices: ApiService, private route: Router,private fb: FormBuilder) { }
  
  ngOnInit(): void {
    // validation
    this.taskForm = this.fb.group({
      name: ['',Validators.required],
      phone :['',Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    })
    

    this.apiServices.getByUrls('http://localhost:3000/v/oper/getcounty')
    .then(result => {
      this.allCountries = result
      console.log(result);
      
    }).catch(err => {
      console.log(err);
      (err)
    })
  }
  
  register(){
    this.isSubmitted = true
    if (this.taskForm.valid){
      console.log('isma');
      console.log(this.taskForm.value);
      this.apiServices.postByUrls('http://localhost:3000/v/cus/register',this.taskForm.value).
    then(result => {
      console.log(result)
      this.messages = result;
    }).catch((error) => console.log(error));
    }   
  }
  oncountrySelected(value:any){
   this.countryvalue = value;
    this.apiServices.getByUrls('http://localhost:3000/v/oper/getstate/'+value)
    .then(result => {
      this.states = result;
    })
}
oncountrystate(state:any){
    
  this.apiServices.getByUrls('http://localhost:3000/v/oper/'+this.countryvalue+'/'+state)
  .then(result => {
    this.cities = result;
  })
}

}
