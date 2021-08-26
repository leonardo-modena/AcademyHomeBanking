import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeBanking';

  constructor(private httpService: HttpClient) {}

  click(){
    console.log('ciao');
    
     this.httpService.post('www.google.it', {
      psw: 'ciao'
    }).subscribe(
      (res) => {console.log(res)},
      (err) => console.log(err)
    )
  }

}
