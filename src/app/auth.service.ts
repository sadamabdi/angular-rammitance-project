import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  public accesstoken(access:any){
    localStorage.setItem('accesstoken', access);
  }
  public getaccess(){
    return localStorage.getItem('accesstoken');
  }

  public isLoggedIn(){
    const state = localStorage.getItem('accesstoken') !== null?true:false;
    return state;
  }

  public logout(){
    localStorage.removeItem('accesstoken');
  }

  public customerInfo(customer:any){
    localStorage.setItem('customer', JSON.stringify(customer))
  }
  public getCustomerInfo(){
    return localStorage.getItem('customer')
  }

  public customerLogOut(){
    return localStorage.removeItem('customer')
  }

  public iscusomerlog(){
    const state = localStorage.getItem('customer') !== null?true:false;
    return state;
  }

}
