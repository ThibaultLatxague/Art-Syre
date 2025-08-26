import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './compte/login/login.component';
import { RegisterComponent } from './compte/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PanierComponent } from './panier/panier.component';
import { ListSouhaitComponent } from './list-souhait/list-souhait.component';
import { RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/accueil-administration/administration.component';
import { AdministrationUtilisateursComponent } from './administration/administration-utilisateurs/administration-utilisateurs.component';
import { AdministrationTableauxComponent } from './administration/administration-tableaux/administration-tableaux.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { DetailCompteComponent } from './compte/detail-compte/detail-compte.component';
import { ContactComponent } from './contact/contact.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ArtisteComponent } from './artiste/artiste.component';
import { ProcedeFabricationComponent } from './procede-fabrication/procede-fabrication.component';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    RegisterComponent,
    PanierComponent,
    ListSouhaitComponent,
    AdministrationComponent,
    AdministrationUtilisateursComponent,
    AdministrationTableauxComponent,
    ConfirmDialogComponent,
    DetailCompteComponent,
    ContactComponent,
    ArtisteComponent,
    ProcedeFabricationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatIconButton,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
