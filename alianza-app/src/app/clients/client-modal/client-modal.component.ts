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
    { provide: DateAdapter, useClass: NativeDateAdapter }, // Proveedor del adaptador de fechas
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
      // Aquí puedes manejar los datos del formulario
      this.dialogRef.close(this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  save(): void {
    if (this.form.valid) {
      // Mostramos la alerta de confirmación
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
          // Si el usuario confirma, obtenemos los valores del formulario
          const clientData: Client = this.form.value;

          // Llamamos al servicio para guardar los datos
          this.clientService.createClient(clientData).subscribe(
            (response) => {
              Swal.fire(
                'Guardado!',
                'Los datos se han guardado correctamente.',
                'success'
              );

              // Emitimos el cliente guardado al componente principal para que actualice la lista
              this.clientSaved.emit(response); // Asegúrate de que la respuesta contenga todos los datos correctos
              this.dialogRef.close(response); // Cerramos el modal y pasamos la respuesta
            },
            (error) => {
              Swal.fire(
                'Error',
                'Hubo un problema al guardar los datos.',
                'error'
              );
            }
          );
        }
      });
    } else {
      // Si el formulario no es válido, marcar todos los campos como "tocados" para mostrar los errores
      this.form.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
