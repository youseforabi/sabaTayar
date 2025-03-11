import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent ,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'SabaTours';
  showNavBarFooter : boolean = true;

  constructor(private router :Router){

    this.router.events.subscribe(()=>{
      const url = this.router.url;
      this.showNavBarFooter = !(
        url.startsWith('/dashboard') ||
        url.startsWith('/login') ||
        url.startsWith('/register')
      );
      })

  }

}
