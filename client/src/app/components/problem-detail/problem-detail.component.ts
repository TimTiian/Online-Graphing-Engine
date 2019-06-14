import { Component, OnInit } from '@angular/core'; //引入Angular中的Component模块
import { ActivatedRoute, Params } from '@angular/router'; // Router 模块
import { Problem } from '../../models/problem.model'; //因为引入了Problem属性
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() { //可以从URL拿到需要的id，从dataService当中拿到需要的信息
    this.route.params.subscribe(params => { //subscribe 观察者模式写法； routes.param是一个数据源
      // this.problem = this.dataService.getProblem(+params['id']);//+的作用，将string转换为Integer
      this.dataService.getProblem(+params['id'])
        .then(problem => this.problem = problem);
    });
  }

}
