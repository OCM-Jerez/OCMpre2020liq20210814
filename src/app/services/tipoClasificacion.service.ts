import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class TipoClasificacionService {
  tipoClasificacion = "";

  public getTipoClasificacion(): string {
    return this.tipoClasificacion;
  }
}
