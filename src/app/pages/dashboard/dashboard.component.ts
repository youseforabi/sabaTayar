import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarDashboardComponent } from '../../components/navbar-dashboard/navbar-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-dashboard',
    standalone:true,

    imports: [
        CommonModule,
        RouterModule,
        
        SidebarComponent,
        NavbarDashboardComponent,
        NgxChartsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  pageTitle :string = 'Dashboard';

  updateTitle(title: string) {
    this.pageTitle = title;
  }

  
}
