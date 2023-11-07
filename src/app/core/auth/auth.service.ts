import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/model/user';
import jwt_decode from 'jwt-decode';
import { UserCredential } from '../interface/user-credential';
import { Observable, Observer, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserLogin } from '../interface/UserLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiLogin: string;
  urlApiUser: string;

  routeLogin: string = '/api/login';
  routeUser: string = '/api/user_auth';
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.urlApiLogin = `${environment.apiUrl}${this.routeLogin}`;
    this.urlApiUser = `${environment.apiUrl}${this.routeUser}`;
  }

  login(user: UserLogin) {
    const jsonUser = { username: user.email, password: user.password };

    this.http.post<any>(this.urlApiLogin, jsonUser).subscribe((res) => {
      this.localStorage.setToken(res.token);

      const DecodedToken: UserCredential = jwt_decode(res.token);

      this.localStorage.setUserCredentials(DecodedToken);

      const id = DecodedToken.id;

      this.getAuthUser(id).subscribe((user) => {
        this.localStorage.setUser(user);

        this.router.navigate(['/account']);
      });
    });
  }

  isLogin(): boolean {
    const UserCred = this.getCredentiel();

    if (UserCred) {
      try {
        const expirationDate = new Date(UserCred.exp * 1000);
        const now = new Date();

        if (now < expirationDate) {
          return true;
        } else {
          this.localStorage.clearUserCredentials();
          this.localStorage.clearToken();
          this.localStorage.clearUser();
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  logout(): void {
    this.localStorage.clearToken();
    this.localStorage.clearUser();
    this.localStorage.clearUserCredentials();

    this.router.navigate(['/']);
  }

  getCredentiel(): UserCredential | null {
    const JSONCredentials = localStorage.getItem('userCredentials');

    return JSONCredentials ? JSON.parse(JSONCredentials) : null;
  }

  getCurrentUser(): Observable<User> | undefined {
    const credential: UserCredential | null = this.getCredentiel();

    if (credential) {
      return this.http.get<User>(`${this.urlApiUser}/${credential.id}`);
    } else {
      return undefined;
    }
  }

  getAuthUser(id: number): Observable<User> {
    const token = this.localStorage.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<User>(`${this.urlApiUser}/${id}`, {
      headers: headers,
    });
  }

  createUserFromJson(userJson: string | null): User | null {
    let user = null;
    if (userJson) {
      user = JSON.parse(userJson) as User;
    }
    return user;
  }

  getGalery() {
    const token = this.localStorage.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${environment.apiUrl}/galery`, {
      headers: headers,
    });
  }
}
