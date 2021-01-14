import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { User } from '../models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: User[] = []
  form: FormGroup

  constructor(private adminSvc: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.adminSvc.getUsers()
      .then(r => {
        this.userList = r['result']
      })
      .catch(e => console.log(e))

    this.form = this.fb.group({
      email: this.fb.control('',[Validators.required]),
      role: this.fb.control('',[Validators.required]),
      name: this.fb.control('',[Validators.required]),
    })
  }

  deleteUser(email: string) {

    this.userList = this.userList.filter(v => v.email != email)

    this.adminSvc.deleteUser(email)
    .then(r => console.log(r))
    .catch(e => console.log(e))
    
  }

  updateUser(email: string) {
    const idx = this.userList.findIndex(v => v.email == email)
    const oldRole = this.userList[idx].role
    let newRole = ''

    if (oldRole == 'user') {
      newRole = 'admin'
    } else {
      newRole = 'user'
    }

    this.userList[idx].role = newRole

    this.adminSvc.updateUser(email, newRole)
    .then(r => console.log(r))
    .catch(e => console.log(e))

  }

  addUser() {
    
    const email = this.form.value.email
    const role = this.form.value.role
    const name = this.form.value.name

    this.userList.push({email, role, name})

    this.adminSvc.addUser(email, role, name)    
    .then(r => console.log(r))
    .catch(e => console.log(e))
    
    this.form.reset()
  }

}
