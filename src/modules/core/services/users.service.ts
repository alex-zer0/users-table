import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserInterface, Paged } from 'src/interfaces';

@Injectable()
export class UsersService {
  private api = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  fetchUsersByPage(page: number): Observable<Paged<UserInterface>> {
    return this.http.get<Paged<UserInterface>>(`${this.api}?page=${page}`);
  }

  fetchUserById(id: number): Observable<UserInterface> {
    return this.http.get<{data: UserInterface}>(`${this.api}/${id}`)
      .pipe(map(response => response.data));
  }
}
