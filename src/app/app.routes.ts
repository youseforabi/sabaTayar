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
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AddNewTourComponent } from './pages/add-new-tour/add-new-tour.component';
import { AdsManagerComponent } from './pages/ads-manager/ads-manager.component';
import { AddNewBookingComponent } from './pages/add-new-booking/add-new-booking.component';
import { AddNewInvoiceComponent } from './pages/add-new-invoice/add-new-invoice.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { AddNewBlogComponent } from './pages/add-new-blog/add-new-blog.component';
import { ListingToursComponent } from './pages/listing-tours/listing-tours.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CreateNewUserComponent } from './pages/user-management/create-new-user/create-new-user.component';
import { BlogDetailsComponent } from './pages/home/blog-details/blog-details.component';
import { TourDetailsComponent } from './pages/tour-details/tour-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },

    {
         path: 'dashboard', 
         component: DashboardComponent,
         children:[
            {path:'',component:InnerdashboardComponent},
            {path:'user-management',component:UserManagementComponent},
            {path:'create-new-user',component:CreateNewUserComponent},
            {path:'chat',component:ChatComponent},
            {path:'myToors',component:MyToorsComponent},
            {path:'myBooking',component:MyBookingComponent},
            {path:'comments',component:CommentsComponent},
            {path:'withdrawals',component:WithdrawalsComponent},
            {path:'adsManager',component:AdsManagerComponent},
            {path:'invoices',component:InvoicesComponent},
            {path:'settings',component:SettingsComponent},
            {path:'add-new-tour',component:AddNewTourComponent},
            {path:'add-new-booking',component:AddNewBookingComponent},
            {path:'add-new-invoice',component:AddNewInvoiceComponent},
            {path:'blogs',component:BlogsComponent},
            {path:'add-new-blog',component:AddNewBlogComponent},
         ] 
    },
    { path: 'listingTours', component: ListingToursComponent, canActivate: [authGuard] },
    { path: 'blogPosts', component: BlogPostComponent, canActivate: [authGuard] },
    { path: 'blog/:id', component: BlogDetailsComponent }, // مسار صفحة التفاصيل
    { path: 'tours/:id', component: TourDetailsComponent },


    { path: 'contactUs', component: ContactUsComponent },

    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}

];
