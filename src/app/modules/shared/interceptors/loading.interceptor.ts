import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { LoadingService } from "../services/loading.service";

export const loadingInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    const loader: LoadingService = inject(LoadingService);
    loader.displayLoading();
    return next(request).pipe(finalize(() => loader.hiddenLoading()));
}