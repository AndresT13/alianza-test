import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  NativeDateAdapter,
  MAT_NATIVE_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { Client } from '../../model/Client';
import Swal from 'sweetalert2';

@Component({
  selector: 'client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css'],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
})
export class ClientModalComponent {
  form: FormGroup;
  @Output() clientSaved: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(
    public dialogRef: MatDialogRef<ClientModalComponent>,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      name: [data?.name || '', Validators.required],
      phone: [data?.phone || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || '', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  save(): void {
    if (this.form.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Quieres guardar los cambios!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const clientData: Client = this.form.value;

          this.clientService.createClient(clientData).subscribe({
            next: (response) => {
              Swal.fire(
                'Guardado!',
                'Los datos se han guardado correctamente.',
                'success'
              );

              this.clientSaved.emit(response);
              this.dialogRef.close(response);
            },
            error: (error) => {
              Swal.fire(
                'Error',
                'Hubo un problema al guardar los datos.',
                'error'
              );
            },
          });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
