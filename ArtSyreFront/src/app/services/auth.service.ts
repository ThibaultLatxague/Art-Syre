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
                    console.log('Réponse de la connexion:', response);
                    localStorage.setItem('utilisateurCourant', JSON.stringify(response.id));
                    //this.setAuthData(response);
                })
            );
    }

    logout(): Observable<any> {
        return this.http.post(`${this.API_URL}/logout`, {})
            .pipe(
                tap(() => {
                    this.clearAuthData();
                })
            );
    }

    getCurrentUserAngular(): Utilisateur{
        //return this.userSubject.asObservable();
        if (localStorage.getItem('utilisateurCourant')) {
            return JSON.parse(localStorage.getItem('utilisateurCourant')!);
        }
        return new Utilisateur(0, '', '', '', '', '', false, [], []);
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