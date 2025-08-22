import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

export interface LoginResponse {
    id: number;
    name: string;
    prenom: string;
    email: string;
    emailVerifAt: string;
    estAdmin: boolean;
    dateCreation: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'http://localhost:8000';
    private readonly TOKEN_KEY = 'auth-token';

    private userSubject = new BehaviorSubject<Utilisateur | null>(null);
    //public user = this.userSubject.asObservable();
    private user: Utilisateur | null = null;

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkAuthState();
    }

    login(email: string, password: string): Observable<Utilisateur> {
        return this.http.post<Utilisateur>(`${this.API_URL}/login`, { email, password })
            .pipe(
                tap(response => {
                    // Transformation en tableaux si JSON string
                    if (typeof response.tableauxLikes === 'string') {
                        try {
                            response.tableauxLikes = JSON.parse(response.tableauxLikes);
                        } catch {
                            response.tableauxLikes = [];
                        }
                    }

                    if (typeof response.tableauxDansPanier === 'string') {
                        try {
                            response.tableauxDansPanier = JSON.parse(response.tableauxDansPanier);
                        } catch {
                            response.tableauxDansPanier = [];
                        }
                    }

                    if (typeof response.estAdmin === 'string') {
                        try {
                            response.estAdmin = JSON.parse(response.estAdmin);
                        } catch {
                            response.estAdmin = false;
                        }
                    }

                    console.log('Réponse de la connexion (après conversion):', response);
                    localStorage.setItem('utilisateurCourant', JSON.stringify(response));
                })
            );
    }

    logout(): Observable<any> {
        console.log("Déconnexion de l'utilisateur");
        localStorage.removeItem('utilisateurCourant');
        return this.http.post(`${this.API_URL}/logout`, {})
            .pipe(
                tap(() => {
                    this.clearAuthData();
                })
            );
    }

    deleteAccount(): Observable<any> {
        this.user = this.getCurrentUserAngular();
        console.log("Suppression du compte de l'utilisateur");
        localStorage.removeItem('utilisateurCourant');
        // TODO : changer route API et tester backend
        return this.http.delete(`${this.API_URL}/utilisateur/${this.user?.id}`)
            .pipe(
                tap(() => {
                    this.clearAuthData();
                })
            );
    }

    getCurrentUserAngular(): Utilisateur | null {
        console.log("getCurrentUserAngular: ", localStorage.getItem('utilisateurCourant'));
        if (localStorage.getItem('utilisateurCourant')) {
            var user = <Utilisateur>JSON.parse(localStorage.getItem('utilisateurCourant')!);
            return user;
        }
        return null;
    }

    getCurrentUserLaravel(): Observable<Utilisateur> {
        var response = this.http.get<Utilisateur>(`${this.API_URL}/me`).pipe(
            tap(user => console.log("Réponse de l'utilisateur courant:", user))
        );
        return response;
    }


    // private setAuthData(response: LoginResponse): void {
    //     //localStorage.setItem(this.TOKEN_KEY, response.token);
    //     console.log('Utilisateur connecté:', response);
    //     this.userSubject.next(response);
    //     this.isAuthenticatedSubject.next(true);
    // }

    private clearAuthData(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.userSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }

    private checkAuthState(): void {
        const token = this.getToken();
        if (token) {
            // Vérifier si le token est valide en récupérant l'utilisateur
            this.getCurrentUserLaravel().subscribe({
                next: (user) => {
                    this.userSubject.next(user);
                    this.isAuthenticatedSubject.next(true);
                },
                error: () => {
                    this.clearAuthData();
                }
            });
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}