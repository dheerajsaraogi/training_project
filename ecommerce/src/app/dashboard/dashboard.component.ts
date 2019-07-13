import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public loginService: LoginService,
    public route: ActivatedRoute,
    public router: Router) { }
    username: string;
  ngOnInit() {

    this.route.paramMap.subscribe((paraMap)=>{
      if(paraMap.has('username')){
        this.username = paraMap.get('username');
        this.loginService.putusername(this.username);
      } else {
        this.username = this.loginService.getusername();
      }
    })
  

  }
  nav(){
    this.router.navigate(['/']);
  }
}
