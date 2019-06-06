import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

const DEFAULT_PROBLEM: Problem = Object.freeze({ //做了一个copy，不可修改的object
  id: 0,
  name: '',
  desc:'',
  difficulty: 'easy'
});//空白数据模板

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  difficulties: string[] = ['easy', 'medium', 'hard', 'super'];
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }
  
  addProblem(){
    this.dataService.addProblem(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM); //产生每个题目，需要新生成一个newProblem的object
  }

}
