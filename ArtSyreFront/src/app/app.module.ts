import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatGridTile } from '@angular/material/grid-list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatError } from '@angular/material/form-field';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PanierComponent } from './panier/panier.component';
import { ListSouhaitComponent } from './list-souhait/list-souhait.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    RegisterComponent,
    PanierComponent,
    ListSouhaitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    HttpClientModule,
    MatCardModule,
    MatCardActions,
    MatButtonModule,
    MatIconModule,
    MatGridTile,
    MatGridListModule,
    MatTooltipModule,
    MatButton,
    MatIcon,
    MatSnackBarModule,
    MatError,
    MatSpinner,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
