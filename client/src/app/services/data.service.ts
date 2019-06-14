import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';

import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  
  constructor(private httpClient: HttpClient) { }
  
  getProblems(): Observable<Problem[]>{ // Problem[] 表示是个数组
    //return this.problems;
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {  // any表示数据类型是任何的
        this._problemSource.next(res);
      })
      .catch(this.handleError);
      
      return this._problemSource.asObservable();
  }
  
  getProblem(id: number): Promise<Problem>{
    //return this.problems.find( (problem) => problem.id === id); //(problem) 是一个输入  三等号：是javascript中在判断两端是否相等，不仅考虑数值，还考虑type
    return this.httpClient.get(`api/v1/problems/${id}`)//方便拿到数据
      .toPromise()
      .then((res: any) => res)  // any表示数据类型是任何的
      .catch(this.handleError);
  } 
  
  addProblem(problem: Problem){
    // problem.id = this.problems.length + 1;
    // this.problems.push(problem);
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post('api/v1/problems', problem, options)
      .toPromise()
      .then((res: any) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any>{
    return Promise.reject(error.body || error);
  }
}