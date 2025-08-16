import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
    id: number;
    name: string;
    email: string;
}

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

    private userSubject = new BehaviorSubject<User | null>(null);
    public user = this.userSubject.asObservable();

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkAuthState();
    }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password })
            .pipe(
                tap(response => {
                    console.log('Réponse de la connexion:', response);
                    this.setAuthData(response);
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

    getCurrentUser(): Observable<User> {
        var response = this.http.get<User>(`${this.API_URL}/me`).pipe(
            tap(user => console.log("Réponse de l'utilisateur courant:", user))
        );
        return response;
    }


    private setAuthData(response: LoginResponse): void {
        //localStorage.setItem(this.TOKEN_KEY, response.token);
        console.log('Utilisateur connecté:', response);
        this.userSubject.next(response);
        this.isAuthenticatedSubject.next(true);
    }

    private clearAuthData(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.userSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }

    private checkAuthState(): void {
        const token = this.getToken();
        if (token) {
            // Vérifier si le token est valide en récupérant l'utilisateur
            this.getCurrentUser().subscribe({
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