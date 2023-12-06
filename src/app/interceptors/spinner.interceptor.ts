import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "../services/spinner.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    /**
     * Es utilizado para modificar las peticiones http
     * en este caso para que ejecute el sppiner cada vez que se realiza una peticion 
     * mediante ajax
     */

    constructor(private spinnerService: SpinnerService, private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //Agrega el token en header de la solicitu
        let authToken = this.authService.getToken();
        if (authToken != null) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${authToken}`
              }
            });
          }
        
        //Agrega un efecto de carga al realizar petición al servicio
        this.spinnerService.show();
        return next.handle(req).pipe(
            finalize(() => this.spinnerService.hide()));
    }

}