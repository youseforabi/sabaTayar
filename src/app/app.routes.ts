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
import {
  adminGuard,
  userGuard,
  anyRoleGuard,
} from './services/Auth/admin.gurad';
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
import { UsersComponent } from './pages/users/users.component';
import { MyWalletComponent } from './pages/users/my-wallet/my-wallet.component';
import { MyBookingsUserComponent } from './pages/users/my-bookings-user/my-bookings-user.component';
import { MyCommentsUserComponent } from './pages/users/my-comments-user/my-comments-user.component';
import { TravelTipsComponent } from './pages/travel-tips/travel-tips.component';
import { ReelsComponent } from './pages/reels/reels.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ClassicTourComponent } from './pages/classic-tour/classic-tour.component';
import { DayTourComponent } from './pages/day-tour/day-tour.component';
import { GuideTourComponent } from './pages/guide-tour/guide-tour.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [anyRoleGuard],
    children: [
      { path: '', component: InnerdashboardComponent },

      // Admin only routes
      {
        path: 'user-management',
        component: UserManagementComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'create-new-user',
        component: CreateNewUserComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'adsManager',
        component: AdsManagerComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'add-new-tour',
        component: AddNewTourComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'add-new-blog',
        component: AddNewBlogComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'add-new-blog/:id',
        component: AddNewBlogComponent,
        canActivate: [adminGuard],
      },

      {
        path: 'userInvoice',
        component: UsersComponent,
        canActivate: [userGuard], // فقط للمستخدمين العاديين
      },

      // { path: 'edit-blog/:id', component: AddNewBlogComponent, canActivate: [adminGuard] },

      // Common routes (accessible by both admin and user)
      { path: 'chat', component: ChatComponent },
      { path: 'myToors', component: MyToorsComponent,canActivate: [adminGuard], },
      { path: 'myBooking', component: MyBookingComponent,canActivate: [adminGuard], },
      { path: 'myBookingUser', component: MyBookingsUserComponent,canActivate: [userGuard], },
      { path: 'comments', component: CommentsComponent,canActivate: [adminGuard], },
      { path: 'myComments', component: MyCommentsUserComponent,canActivate: [userGuard], },
      { path: 'withdrawals', component: WithdrawalsComponent,canActivate: [adminGuard], },
      { path: 'userWithdrawal', component: MyWalletComponent,canActivate: [userGuard], },
      {
        path: 'invoices',
        component: InvoicesComponent,
        canActivate: [adminGuard], // فقط للمديرين
      },
      { path: 'settings', component: SettingsComponent },
      { path: 'add-new-booking', component: AddNewBookingComponent },
      { path: 'add-new-invoice', component: AddNewInvoiceComponent },
      { path: 'blogs', component: BlogsComponent,canActivate: [adminGuard], },
    ],
  },
  { path: 'listingTours', component: ListingToursComponent },
  { path: 'travelTips', component: TravelTipsComponent },
  { path: 'reels', component: ReelsComponent },
  { path: 'classical', component: ClassicTourComponent },
  { path: 'day', component: DayTourComponent },
  { path: 'guide', component: GuideTourComponent },
  

  { path: 'blogPosts', component: BlogPostComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'tours/:id', component: TourDetailsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'about', component: AboutUsComponent },
  

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
