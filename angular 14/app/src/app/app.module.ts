
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './shared/layouts/full/full.component';
import { AppHeaderComponent } from './shared/layouts/full/header/header.component';
import { AppSidebarComponent } from './shared/layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { AppBlankComponent } from './shared/layouts/blank/blank.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LoaderInterceptor } from './authentication/helpers/spinner.interceptor';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './authentication/helpers/error.interceptor';
import { getEsPaginatorIntl } from './shared/components/translation/es-paginator-intl';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppBlankComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          //whitelistedDomains: ['192.168.59.140:3001'],
          //blacklistedRoutes: ['192.168.59.140:3001/auth/']
      }
  }),
  ],
  providers: [AppComponent,
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy
    },
    { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
