import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { ApiService } from '../shared/api.service';
declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted  =  false;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private apiServices: ApiService) { }

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  } 

 

loginn(){
  this.isSubmitted = true
  if(this.loginForm.valid){
    this.isSubmitted = true;
    this.apiServices.login('http://localhost:3000/v/user/login',this.loginForm.value)
    .then(result =>{
      console.log(result.status);
        this.isSubmitted = true;        
        this.authService.accesstoken(result.data.accesstoken);
        window.location.href = '/allusers'
    }).catch(error => 
      // alert(error.error),
      $("#response").html(`
      <div class="alert alert-danger" role="alert">
      ${error.error}!</div>`
      ))
  }
}

  
  
}



