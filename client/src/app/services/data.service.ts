import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  problems: Problem[] = PROBLEMS; //本地变量
  
  constructor() { }
  
  getProblems(): Problem[]{ // Problem[] 表示是个数组
    return this.problems;
  }
  
  getProblem(id: number): Problem{
    return this.problems.find( (problem) => problem.id === id); //(problem) 是一个输入  三等号：是javascript中在判断两端是否相等，不仅考虑数值，还考虑type
  } 
}
