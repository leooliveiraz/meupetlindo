import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgChartsModule } from 'ng2-charts';


import { OAuthModule } from 'angular-oauth2-oidc'
import { ImageCropperModule } from 'ngx-image-cropper';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ContentComponent } from './layout/content/content.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './pages/about/about.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyAnimalsComponent } from './pages/my-animals/my-animals.component';
import { TokenInterceptor } from './services/auth/token-interceptor.service';
import { NewAnimalComponent } from './pages/new-animal/new-animal.component';
import { AnimalComponent } from './pages/animal/animal.component';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { CropperDialogComponent } from './components/cropper-dialog/cropper-dialog.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AnimalImageComponent } from './components/animal-image/animal-image.component';
import { WeightComponent } from './pages/weight/weight.component';
import { VaccineComponent } from './pages/vaccine/vaccine.component';
import { DrugsComponent } from './pages/drugs/drugs.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { ShareAnimalComponent } from './components/share-animal/share-animal.component';
import { AddSharedAnimalComponent } from './pages/add-shared-animal/add-shared-animal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    ContentComponent,
    MainComponent,
    AboutComponent,
    LoginGoogleComponent,
    MyAnimalsComponent,
    NewAnimalComponent,
    AnimalComponent,
    CropperDialogComponent,
    ImageUploadComponent,
    AnimalImageComponent,
    WeightComponent,
    VaccineComponent,
    DrugsComponent,
    ExamsComponent,
    ShareAnimalComponent,
    AddSharedAnimalComponent,
    NotificationComponent,
    NotificationDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule,
    ImageCropperModule,
    NgChartsModule,
    OAuthModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: ['DD/MM/YYYY'],
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
