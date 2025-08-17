import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  private apiUrl = `${environment.apiUrl}/utilisateur`;

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUtilisateur(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUtilisateur(data: Utilisateur): Observable<any> {
    console.log("Tentative de création d'un utilisateur avec les données suivantes :");
    console.log(data);
    return this.http.post(this.apiUrl, data);
  }

  connectUtilisateur(email: string, password: string): Observable<any> {
    console.log("Tentative de connexion avec les identifiants suivants :");
    console.log("Email: " + email + ", Mot de passe: " + password);
    var $response = this.http.post(`${this.apiUrl}/login`, { email, password });
    $response.subscribe(
      data => console.log("Réponse de la tentative de connexion :", data),
      error => console.error("Erreur lors de la tentative de connexion :", error)
    );
    return $response;
  }

  updateUtilisateur(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteUtilisateur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Ajoute un tableau aux favoris de l'utilisateur.
   * @param tableauId L'identifiant du tableau à ajouter aux favoris.
   * @returns Un observable contenant la réponse de l'API.
   */
  addLike(tableauId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${tableauId}/likes`, {tableauId});
  }

  /**
   * Supprime un tableau des favoris de l'utilisateur.
   * @param tableauId L'identifiant du tableau à supprimer des favoris.
   * @returns Un observable contenant la réponse de l'API.
   */
  removeLike(tableauId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tableauId}/likes`);
  }

  /**
   * Ajoute un tableau au panier de l'utilisateur.
   * @param tableauId L'identifiant du tableau à ajouter au panier.
   * @returns Un observable contenant la réponse de l'API.
   */
  addToCart(tableauId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${tableauId}/panier`, {tableauId});
  }

  /**
   * Supprime un tableau du panier de l'utilisateur.
   * @param tableauId L'identifiant du tableau à supprimer du panier.
   * @returns Un observable contenant la réponse de l'API.
   */
  removeFromCart(tableauId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tableauId}/panier`);
  }
}