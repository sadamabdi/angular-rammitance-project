import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  re: any;

  constructor(private authService: AuthService,private Http: HttpClient) { }
  ngOnInit(): void {
    
  } 
  
  getNonAuth(url:any): Promise<any> {
    return new Promise((resolve,reject)=> {
      this.Http.get(url)
      .toPromise()
      .then(result =>{
        if (result) {
          resolve(result)
          console.log(result); 
        }
      }).catch(err => {
        reject(err)
      })
    })  
  }

  login(url:any,data: any):Promise<any> {
    return new Promise((resolve,reject)=> {
      this.Http.post(url,data).toPromise().then(result =>{
        resolve(result)        
      }).catch(error => reject(error.error));
    })

  }
  
 

  getByUrls(url: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getaccess()}`
    });
    return new Promise((resolve,reject)=> {
      this.Http.get(url,{headers:headers})
      .toPromise()
      .then(result =>{
        if (result) {
          resolve(result)
          // console.log(result); 
        }
      }).catch(err => {
        reject(err.error)
      })
    })   
  }

  postByUrls(url: any,data:any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getaccess()}`
    });
    return new Promise((resolve,reject)=> {
      this.Http.post(url,data,{headers:headers})
      .toPromise()
      .then(result =>{
        if (result) {
          resolve(result)
          console.log(result); 

        }else{
          reject(result)
        }
      }).catch(err => {
        reject(err.error);
      })
    })   
  }


 


}