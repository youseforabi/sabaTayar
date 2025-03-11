import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InnerdashboardComponent } from './pages/innerdashboard/innerdashboard.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MyToorsComponent } from './pages/my-toors/my-toors.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { WithdrawalsComponent } from './pages/withdrawals/withdrawals.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },

    {
         path: 'dashboard', 
         component: DashboardComponent,
         children:[
            {path:'',component:InnerdashboardComponent},
            {path:'chat',component:ChatComponent},
            {path:'myToors',component:MyToorsComponent},
            {path:'myBooking',component:MyBookingComponent},
            {path:'comments',component:CommentsComponent},
            {path:'withdrawals',component:WithdrawalsComponent},
            {path:'invoices',component:InvoicesComponent},
            {path:'settings',component:SettingsComponent}
         ] 
    },
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}

];
