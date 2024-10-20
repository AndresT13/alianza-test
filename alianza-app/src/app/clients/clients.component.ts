import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../Services/client.service';
import { Client } from '../model/Client';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientModalComponent } from './client-modal/client-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit, AfterViewInit {
  clientes: Client[] = [];
  clienteSeleccionado: Client | undefined;
  listClients: any;

  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();

  form: FormGroup;
  displayedColumns: string[] = [
    'sharedKey',
    'name',
    'email',
    'phone',
    'startDate',
    'edit',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startData: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerClientes(): void {
    this.clientService.findAll().subscribe({
      next: (data: any) => {
        console.log('Clientes recibidos:', data);
        this.dataSource.data = data.object;
        this.actualizarPaginatorYSort();
      },
      error: (error) => {
        console.error('Error al obtener los clientes:', error);
      },
    });
  }

  actualizarPaginatorYSort(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  openClientModal(): void {
    const dialogRef = this.dialog.open(ClientModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: Client) => {
      if (result) {
        console.log('Nuevo cliente guardado:', result);

        this.dataSource.data = [...this.dataSource.data, result];
        this.actualizarPaginatorYSort();
      } else {
        console.log('Modal cerrado sin datos');
      }
    });
  }

  eliminarCliente(cliente: Client): void {
    console.log('Eliminar cliente:', cliente);

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡No podrás revertir la eliminación de ${cliente.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.remove(cliente.sharedKey).subscribe({
          next: (response: string) => {
            Swal.fire(
              'Eliminado!',
              `El cliente ${cliente.name} ha sido eliminado.`,
              'success'
            );

            this.obtenerClientes();
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el cliente.',
              'error'
            );
          },
        });
      }
    });
  }

  exportFile(): void {
    console.log('Exportar archivo');
  }
}
