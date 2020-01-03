import { Component , ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { from, zip, range ,of , merge , Observable} from 'rxjs';
import { fromEvent } from 'rxjs';

import { map, take, filter, toArray, partition , scan  ,debounceTime, pluck  } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<input type='text' #searchInput> 
  <select #type> 
  <option value="User">user</option>
  <option value="Organization">Organization</option>
  </select>
  <button #button> Search </button>
  `
})
export class AppComponent { 



  public arr = range(1, 200);
  cau_1 = this.arr.pipe( filter(arr => arr % 2 == 0)).pipe(toArray()).subscribe(val => { console.log('Cau 1'); console.log((val))});
  cau_2 = merge(
    this.arr.pipe(filter(i=> i%2==0)).pipe(toArray()),
    this.arr.pipe(filter(i=> i%2==1)).pipe(toArray())
  ).pipe(toArray()).subscribe(val => { console.log("Cau 2"); console.log(val) });

  cau_3 = this.arr.pipe(scan((acc, curr) => acc + curr, 0)).pipe(toArray()).subscribe(val => { console.log("cau 3"); console.log(val)});

  cau_4 = this.arr.pipe( filter(arr => arr % 2 == 0 ), take(50)).pipe(toArray()).subscribe(val => { console.log('Cau 4'); console.log((val))});
  
  cau_5 = this.arr.pipe( filter(arr =>  arr % 2 == 0 && arr <50)).pipe(toArray()).subscribe(val => { console.log('Cau 5'); console.log((val))});

  b = [1,2,3] ;
  a =['a','b','c'] ;

  cau_6 =merge(
    from(this.a).pipe().pipe(toArray()),
    from(this.b).pipe().pipe(toArray())
  ).pipe(toArray()).subscribe(val => { 
    console.log("Cau 6")
    var rs =[];
    for(let i = 0; i< val[0].length; i++){
     rs[i] = (val[0][i]) +  String(val[1][i])
    }
     console.log(rs);
  });
   cau_7 = fetch(`https://api.github.com/users?per_page=100`)
  .then(response => response.json())
  .then(responseJson => {
        //  console.log(responseJson);
         from(responseJson).pipe().pipe(map(i =>  ({username: i.login, type: i.type, avatar: i.avatar_url}))).pipe(toArray()).subscribe(val => {
          { console.log("Cau 7") ; console.log(val) }
         }) 
   })

  @ViewChild('searchInput', {static : true}) input:ElementRef; 
  @ViewChild('type', {static : true}) change:ElementRef; 
  @ViewChild('button', {static : true}) click:ElementRef; 



  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
        debounceTime(300),
        pluck('target', 'value')
          ).subscribe(value => {
            fetch(`https://api.github.com/users?per_page=100`)
            .then(response => response.json())
            .then(responseJson => {
                   from(responseJson).pipe( filter(arr => arr.login.includes(value))).pipe(toArray())
                   .subscribe(val => {
                    { console.log("Cau 8"); console.log(val) }
        }) 
      })


    })  

    fromEvent(this.change.nativeElement, 'change').pipe(
      pluck('target', 'value')
        ).subscribe(value => {
          fetch(`https://api.github.com/users?per_page=100`)
          .then(response => response.json())
          .then(responseJson => {
                 from(responseJson).pipe( filter(arr => arr.type ==  value)).pipe(toArray())
                 .subscribe(val => {
                  { console.log("Cau 9"); console.log(val) }
      }) 
    })


  }) 

  fromEvent(this.click.nativeElement, 'click').pipe(
    debounceTime(300)
      ).subscribe(value => {
        fetch(`https://api.github.com/users?per_page=100`)
        .then(response => response.json())
        .then(responseJson => {
               from(responseJson).pipe(toArray())
               .subscribe(val => {
                { console.log("Cau 10"); console.log(val) }
    }) 
  })


}) 
  
  
  }
  
  title = 'Task9';
}
