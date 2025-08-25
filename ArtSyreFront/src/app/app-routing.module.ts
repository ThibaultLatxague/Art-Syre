import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './compte/login/login.component';
import { RegisterComponent } from './compte/register/register.component';
import { PanierComponent } from './panier/panier.component';
import { ListSouhaitComponent } from './list-souhait/list-souhait.component';
import { AdministrationComponent } from './administration/accueil-administration/administration.component';
import { AdministrationUtilisateursComponent } from './administration/administration-utilisateurs/administration-utilisateurs.component';
import { AdministrationTableauxComponent } from './administration/administration-tableaux/administration-tableaux.component';
import { DetailCompteComponent } from './compte/detail-compte/detail-compte.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'liste-souhait', component: ListSouhaitComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'administration/utilisateurs', component: AdministrationUtilisateursComponent },
  { path: 'administration/tableaux', component: AdministrationTableauxComponent },
  { path: 'compte', component: DetailCompteComponent},
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
