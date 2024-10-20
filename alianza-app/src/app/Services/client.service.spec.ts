import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Importa el módulo para pruebas de HTTP
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ClientService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
