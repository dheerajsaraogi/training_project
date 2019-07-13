import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username: string;
  constructor(private router: Router,
    private http: HttpClient) { }

  userSignUp(user:any){
    this.http.post('http://localhost:1025/auth/signup',user).subscribe((responseData) => {
      console.log("Result :: " , responseData);
      if(responseData["status"] == "success"){
           if (responseData["data"]["userType"] == "customer"){
            const username =responseData["data"]["username"];
            this.router.navigate(['/dashboard',username])
          }
      }
    });
  }

  userSignIn(user:any){
    this.http.post('http://localhost:1025/auth/signin',user).subscribe((responseData) => {
      console.log("Result :: " , responseData);
      if(responseData["status"] == "success"){
          if(responseData["data"]["userType"] == "Manager"){
             this.router.navigate(['/admin'])

          }else if (responseData["data"]["userType"] == "customer"){
            const username =responseData["data"]["username"];
            this.router.navigate(['/dashboard',username])
          }
      }
    });
  }

  getusername(){
    return this.username;
  }

  putusername(name: string){
    this.username = name;
  }

}