import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


export const authGuard: CanActivateFn = () => {

    const tokenService = inject(AuthService);
    const routerService = inject(Router);

    const token = tokenService.getToken();
    if(!token){
        routerService.navigate(['/login']);
        return false;
    }
    return true;
}