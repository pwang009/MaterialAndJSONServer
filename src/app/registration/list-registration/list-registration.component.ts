import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, resolveForwardRef } from '@angular/core';
import { User } from 'src/app/models/user/user.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-registration',
  templateUrl: './list-registration.component.html',
  styleUrls: ['./list-registration.component.scss']
})


export class ListRegistrationComponent implements OnInit {
  dataSource!: MatTableDataSource<User>;
  users!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmi', 'bmiResult', 'gender', 'beenGym', 'requestTrainer','enquiryDate', 'action'];

  constructor(private api: ApiService, private router: Router, private confirm: NgConfirmService, private toastr: NgToastService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number){
    this.router.navigate(['update', id]);
  }

  delete(id: number) {
    this.confirm.showConfirm("Are you sure",
    () => {
      this.api.deletUser(id).subscribe(res => {
        this.toastr.success({ detail: 'Success', summary: 'Deleted successfully', duration: 3000});
        this.getUsers();
      });
    },
    () => {})
  }
}
