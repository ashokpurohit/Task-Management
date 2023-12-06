import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskManagement } from '../_models/taskManagement';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getTaskData() {
    return this.http.get<any>('../../assets/_data/taskManagement.json')
  }
}
