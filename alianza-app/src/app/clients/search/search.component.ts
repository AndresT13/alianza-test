import { Component } from '@angular/core';
import { ClientService } from '../../Services/client.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class ClientSearchComponent {
  searchQuery: string = ''; // Para búsqueda rápida
  isAdvancedSearch: boolean = false;

  filters = {
    clientType: '',
    startDate: '',
    endDate: '',
    status: '',
  };

  clients: any[] = []; // Lista de clientes que se va a mostrar en la tabla

  constructor(private clientService: ClientService) {}

  // Toggle para activar/desactivar búsqueda avanzada
  toggleAdvancedSearch() {
    this.isAdvancedSearch = !this.isAdvancedSearch;
  }

  // Lógica para búsqueda
  onSearch() {
    if (this.isAdvancedSearch) {
      // Búsqueda avanzada
      this.clientService.searchClients(this.filters).subscribe(
        (data) => {
          this.clients = data; // Asignamos los datos recibidos a la variable clients
          console.log('Advanced Search Results:', this.clients);
        },
        (error) => {
          console.error('Error during search:', error);
        }
      );
    } else {
      // Búsqueda simple
      this.clientService
        .searchClients({ searchQuery: this.searchQuery })
        .subscribe(
          (data) => {
            this.clients = data; // Asignamos los resultados a la variable clients
            console.log('Search Results:', this.clients);
          },
          (error) => {
            console.error('Error during search:', error);
          }
        );
    }
  }
}
