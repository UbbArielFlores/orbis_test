import { Component, Input } from '@angular/core';
import { Tarea, TaskService } from '../../services/task.service';
import { ModalService } from '../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-general',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-general.component.html',
  styleUrl: './modal-general.component.css'
})
export class ModalGeneralComponent {
  @Input() title: string = '';
  @Input() value: Tarea = { title: "", id: "", completed: false };
  @Input() items: Tarea[] | undefined;
  @Input() funcion: (() => void) | undefined;

  constructor(public _modalAngular_: ModalService, public _taskServices_: TaskService) {
  }

  abrirModal() {
    this._modalAngular_.mostrarModal();
  }

  async confirmarModal() {
    //accion exitosa
    if (this.title == 'Agregar') {
      if (this.items) {
        if (this.value.title != "") {
          let nueva_tarea: Tarea = { id: "", title: "", completed: false };
          nueva_tarea.title = this.value.title;

          await this._taskServices_.Addtarea(nueva_tarea).then((data: any) => {
            if (data) {
              if (this.items) {
                this.items.push(data);
              }
            }

          }).catch((error: any) => {
            console.log(error);
          });


        }
      }
    } else if (this.title == 'Editar') {
      if (this.items) {

        await this._taskServices_.Updatetarea(this.value.id, this.value).then(() => {
          if (this.items) {

            for (let item of this.items) {
              if (this.value.id == item.id) {
                item.title = this.value.title;
                break
              }
            }
          }
        }).catch((error: any) => {
          console.log(error);
        });


      }

    } else if (this.title == 'Eliminar') {

      if (this.items) {
        const index = this.items.findIndex(item => item.id === this.value.id);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      }
      
      this._taskServices_.Deletetarea(this.value.id).then((data: any) => {
        
      }).catch((error: any) => {
        console.log(error);
      });
    }
    this._modalAngular_.ocultarModal();
  }

  ocultarModal() {
    this._modalAngular_.ocultarModal();
  }

  ejecutarFuncion() {
    if (this.funcion) {
      this.funcion();
    }
  }

}
