import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Ajouter withCredentials à toutes les requêtes vers l'API Laravel
        if (req.url.includes('localhost:8000')) {
        req = req.clone({
            setHeaders: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        }
        
        return next.handle(req);
    }
}