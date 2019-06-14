import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit, OnDestroy {
  problems: Problem[];
  subcriptionProblems: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getProblems();
  }
  
  ngOnDestroy(){
    this.subcriptionProblems.unsubscribe();
  }
  
  getProblems() {
    // this.problems = this.dataService.getProblems();
    this.subcriptionProblems = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }

}