import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user/user.module';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})


export class DetailsComponent implements OnInit{
  userID!: number;
  userDetails!: User;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( val => {
      this.userID = val['id'];
      this.getUserDetails(this.userID);
    })
  }

  getUserDetails(id: number) {
    this.api.getUserById(id).subscribe(res => {
      this.userDetails = res;
    })
  }
}

