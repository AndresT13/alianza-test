import { Component } from '@angular/core';
import { ClientService } from '../../Services/client.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class ClientSearchComponent {
  searchQuery: string = '';
  isAdvancedSearch: boolean = false;

  filters = {
    clientType: '',
    startDate: '',
    endDate: '',
    status: '',
  };

  clients: any[] = [];

  constructor(private clientService: ClientService) {}

  toggleAdvancedSearch() {
    this.isAdvancedSearch = !this.isAdvancedSearch;
  }

  onSearch(): void {
    if (this.isAdvancedSearch) {
      this.clientService.searchClients(this.filters).subscribe({
        next: (data) => {
          this.clients = data;
          console.log('Advanced Search Results:', this.clients);
        },
        error: (error) => {
          console.error('Error during advanced search:', error);
        },
      });
    } else {
      this.clientService
        .searchClients({ searchQuery: this.searchQuery })
        .subscribe({
          next: (data) => {
            this.clients = data;
            console.log('Search Results:', this.clients);
          },
          error: (error) => {
            console.error('Error during search:', error);
          },
        });
    }
  }
}
