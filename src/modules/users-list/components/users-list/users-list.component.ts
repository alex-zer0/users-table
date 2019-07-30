import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UserInterface, Paged } from 'src/interfaces';
import { UsersService } from 'src/modules/core/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  displayedColumns = ['first_name', 'last_name', 'email'];

  ngDestroy$ = new Subject();
  users$: Observable<Paged<UserInterface>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.users$ = this.activatedRoute.queryParams
      .pipe(
        switchMap(({ page }) => this.usersService.fetchUsersByPage(page)),
        takeUntil(this.ngDestroy$)
      );
  }

  pageChanged(event: PageEvent): void {
    const page = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
