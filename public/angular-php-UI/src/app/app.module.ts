import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesDetailsComponent } from './series-details/series-details.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { EditSeriesComponent } from './edit-series/edit-series.component';
import { CastDetailsComponent } from './cast-details/cast-details.component';
import { CastDetailComponent } from './cast-detail/cast-detail.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    ErrorPageComponent,
    SeriesListComponent,
    SeriesDetailsComponent,
    AddSeriesComponent,
    EditSeriesComponent,
    CastDetailsComponent,
    CastDetailComponent,
    RegisterUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"series",
        component:SeriesListComponent
      },
      {
        path:"series/:seriesId",
        component:SeriesDetailsComponent
      },
      {
        path:"register",
        component:AddSeriesComponent
      },
      {
        path:"registerUser",
        component:RegisterUserComponent
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"edit/:seriesId",
        component:EditSeriesComponent
      },
      {
        path:"series/:seriesId/cast",
        component:CastDetailsComponent
      },
      {
        path:"series/:seriesId/cast/:castId",
        component:CastDetailComponent
      },
      
      {
        path:'**',
        component:ErrorPageComponent
      }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
