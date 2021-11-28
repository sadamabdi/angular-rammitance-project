import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isok: any;
iscustomer:any
  constructor(private authservice: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.isok = this.authservice.isLoggedIn();
    this.iscustomer = this.authservice.iscusomerlog();

    console.log(this.isok);
    
  }

  logout(){
    this.authservice.logout();
    // this.router.navigateByUrl('/login')
    window.location.href = '/login'
  

  }

}
