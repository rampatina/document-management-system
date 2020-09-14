import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

export interface DocumentsDetails {
  _id: string;
  name: string;
  content: string;
  created: Date;
  folderid: Object;
  userid: Object;
}

export interface FolderDetails {
  _id: string;
  name: string;
  created: Date;
  userid: Object;
}

export interface DocumentPayload {
  name: String;
  content: String;
  folderid?: String;
  userid?: String;
}

export interface FolderPayload {
  name: String;
  userid: String;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile' | 'documents', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  private requestDocs(method: 'post'|'get', type: any, document?: DocumentPayload): Observable<any> {
    let response;
    console.log('requestDocs called ' + method + 'type ' + type);
    if (method === 'post') {
      response = this.http.post(`/api/${type}`, document, { headers: { Authorization: `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' }});
    } else {
      response = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    //console.log(response);
    return response;
  }

  private requestFolder(method: 'post'|'get', type: any, folder?: FolderPayload): Observable<any> {
    let response;
    console.log('requestDocs called ' + method + ' type ' + type);
    if (method === 'post') {
      response = this.http.post(`/api/${type}`, folder, { headers: { Authorization: `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' }});
    } else {
      response = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    //console.log(response);
    return response;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public documents(): Observable<any> {
    return this.requestDocs('get', 'documents');
  }

  public getDocsInFolder(folderid: any): Observable<any> {
    return this.requestDocs('get', 'documents/'+folderid);
  }

  public addDocument(document: DocumentPayload): Observable<any> {
    return this.requestDocs('post', 'adddoc', document);
  }

  public moveDocument(document: any) : Observable<any> {
    return this.requestDocs('post', 'movedoc', document);
  }

  public folders() : Observable<any> {
    return this.requestFolder('get', 'folders');
  }

  public addFolder(folder: FolderPayload): Observable<any> {
    return this.requestFolder('post', 'addfolder', folder);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
