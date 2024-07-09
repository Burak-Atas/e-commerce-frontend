import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserResponse } from '../models/user-response';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers:[UserService]
})
export class AccountComponent implements OnInit {
  object:any
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(data=>{
      console.log("bu bir deneme mesajı ",data)
      this.object = data
      
    })
  }

  update(first_name:any,last_name:any,email:any,passwd:any){
    const UserResponse={
      first_name:first_name.value,
      last_name:last_name.value,
      email:email.value,
      password:passwd.value
    }

    this.userService.editUser(UserResponse).subscribe(data=>{
     console.log(data);
     
    })
  }

}
