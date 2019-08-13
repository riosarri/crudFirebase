import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  public user = new User();
  
  constructor(private userService: UserService) { 
  
  }

  ngOnInit() {
    this.userService.getUserCollection();
  }

  saveUser() {
    this.userService.addUser(this.user);
  }

  

}
