import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 

  isAuthenticated(): boolean {
    return true;
  }

  logout(): void {
    console.log("Calling logout");
  }

}
