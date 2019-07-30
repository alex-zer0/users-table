import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../../../../interfaces';
import { Observable } from 'rxjs';
import { UsersService } from 'src/modules/core/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user$: Observable<UserInterface>;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const { id: userId } = this.activatedRoute.snapshot.params;
    this.user$ = this.usersService.fetchUserById(userId);
  }

  back(): void {
    this.router.navigate(['./users']);
  }
}
