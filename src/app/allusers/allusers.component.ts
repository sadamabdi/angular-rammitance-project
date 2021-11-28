import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { FormBuilder,FormGroup, NgForm, Validators, } from '@angular/forms';
import { AuthService } from '../auth.service';
declare var $: any

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  isLoading: boolean = false;

  allUsers: any = []
  userForm!: FormGroup;
  isSubmitted  =  false;
  constructor(private authservice: AuthService,private apiServices: ApiService, private route: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.authservice.isLoggedIn()) {
      this.route.navigateByUrl('/')
      return;
    }
    this.userForm = this.fb.group({
      fullname: ['',Validators.required],
      email :['',Validators.required],
      password: ['', Validators.required],
      userid: [''],
    })

    this.allUsersInfo();
  }

  allUsersInfo(){
    this.apiServices.getByUrls('http://localhost:3000/v/user/getAll')
    .then(result => {
      this.allUsers = result; 
      console.log(result);
      
    }).catch(error =>{
      $("#response").html(`
      <div class="alert alert-danger" role="alert">
      ${error.error}!</div>`
      )
    })
  }

  updateUser(user:any){
    $("#action").val('update');
    $("#add").html('update');
    // this.userForm.controls['ufname'].setValue('cali')
    this.userForm.patchValue({
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      userid: user.userid
    })
    $("#staticBackdrop").modal('show')

    
  }

  Addbutton(){
    this.userForm.reset();
    $("#action").val('add');
    $("#add").html('add');
  }


  deleteUser(user:any){
    if (confirm('are you want to delete '+user.fullname)) {
      this.apiServices.getByUrls('http://localhost:3000/v/user/delete/'+user.userid)
      .then(result => {
        console.log(result);
        
      }).catch(error =>{
        $("#response").html(`
      <div class="alert alert-danger" role="alert">
      ${error.error}!</div>`
      )
      })
      
    }
  }

  addUser() {
   var action =  $("#action").val();
  this.isSubmitted = true;
  if (this.userForm.valid){
   var url = action == 'add'?'':'http://localhost:3000/v/user/update/'
   this.sendData(url,this.userForm.value)  
  }    
  }

  sendData(url:any,data:any){
    this.apiServices.postByUrls(url,data)
    .then(result => {
      console.log(result);
      
    }).catch(error => {
      alert(error.error)
      
    })
  }
}
