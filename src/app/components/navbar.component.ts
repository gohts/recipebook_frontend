import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean
  isAdmin: boolean = false
  userName: string = ''
  profilepic: string =''

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.isLogin = this.authSvc.isLogin()
    if(this.isLogin) {
      this.isAdmin = (this.authSvc.role == 'admin')
      this.userName = this.authSvc.username
      this.profilepic = this.authSvc.profilepic
    }
  }

}
