import { Routes, RouterModule } from '@angular/router'; //实现指路的功能
import { ProblemListComponent } from './components/problem-list/problem-list.component'; // 实现将指向的内容引入
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'problems', //指向题库的界面
        pathMatch: 'full'
    },
    {
        path:'problems',
        component:ProblemListComponent
    },
    {
        path: 'problems/:id',
        component: ProblemDetailComponent
    },
    {
        path: '**', //wild 不知道具体内容
        redirectTo: 'problems'
    }
];

export const routing = RouterModule.forRoot(routes); //forRoot()针对根目录设定