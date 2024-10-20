import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from '../model/Client';
import { API_URLS } from '../shared/api-urls';

// Configuración de headers

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  // Crear cliente
  createClient(client: Client): Observable<Client> {
    return this.http
      .post<Client>(API_URLS.create, client)
      .pipe(catchError(this.handleError));
  }

  // Obtener todos los clientes
  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(API_URLS.clients);
  }

  // Obtener un cliente por su 'sharedKey'
  findById(sharedKey: string): Observable<Client> {
    const url = `${API_URLS.clients}/${sharedKey}`;
    return this.http.get<Client>(url).pipe(catchError(this.handleError));
  }

  searchClients(filters: any): Observable<any> {
    return this.http.post(`${API_URLS.search}`, filters);
  }

  // Actualizar un cliente
  updateClient(client: Client, result: any): Observable<Client> {
    const url = `${API_URLS.clients}/${client.sharedKey}`;
    return this.http
      .put<Client>(url, client)
      .pipe(catchError(this.handleError));
  }

  // Eliminar un cliente
  remove(sharedKey: string): Observable<string> {
    const url = API_URLS.delete(sharedKey); // URL de eliminación
    return this.http
      .delete<string>(url, { responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error al procesar la solicitud.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error('Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
