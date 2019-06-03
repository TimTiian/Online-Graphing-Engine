import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observables';
  
  ngOnInit(){
    let promise = new Promise(resolve => {
      console.log('promise start');
      setTimeout( () => {
        resolve('promise resolved');
      }, 3000);
    });
    
    promise.then((value: string) => {console.log(value)});
    
    let stream$ = new Observable(observer => {
      console.log('observable start');
      observer.next(1);
      observer.next(2);
    });
    
    let sub = stream$.subscribe(value => console.log(value));
    let sub2 = stream$.subscribe(value => console.log(value));
  }
}
