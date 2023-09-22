import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { LoginService } from "../services/login.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";


export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    const service: LoginService = inject(LoginService);
    const router: Router = inject(Router);
    const clonedRequest: HttpRequest<any> = request.clone({ headers: request.headers.set('Authorization', `Bearer ${service.getSession()}`) });

    return next(clonedRequest).pipe(catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
            if (error.status == 401 || error.status == 403) {
                router.navigate(['']);
            }
        }
        return throwError(() => error);
    }))
}