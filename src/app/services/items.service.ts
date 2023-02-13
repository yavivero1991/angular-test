import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private baseUrl = environment.baseUrl
  private currentItemSubject: BehaviorSubject<number|undefined>;

  constructor(private http: HttpClient, private _router: Router) {
    this.currentItemSubject = new BehaviorSubject<number|undefined>(undefined);
  }

  getItems(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}`).toPromise();
  }

  getItemById(id: number): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
  }

  getItemSubject(){
    return this.currentItemSubject
  }

  setItemSubject(id:number | undefined = undefined){
    this.currentItemSubject.next(id);
    if(id != null){
      this._router.navigate(['/item'])
    }
  }
}
