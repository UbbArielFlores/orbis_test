import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalGeneralComponent } from '../modals/modal-general/modal-general.component';
import { ModalService } from '../modals/services/modal.service';
import { Tarea, TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-home',
  standalone: true,
  imports: [ModalGeneralComponent,CommonModule],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.css'
})
export class TaskHomeComponent implements OnInit  {
  tipoModal: string = "Editar";
  value: Tarea = {title:"", id:"", completed : false};
  items: Tarea[] = [];
  
  constructor(
    public _modalAngular_ :ModalService,
    private _taskServices_ : TaskService
  ){
    this.getData();
  }

  _editarToEliminar(item: any){
    this.tipoModal= "Eliminar";
    this.value= item;
  }

  _editarToAgregar(){
    this.tipoModal= "Agregar";
    this.value= {title:"", id:"", completed : false};
  }

  _eliminarToEditar(item: any){
    this.tipoModal= "Editar";
    this.value= item;
  }

  actualizar() {
    // setTimeout(() => {
    //   this.weatherData = 'Angular actualizado';
    //   this.items = this.items;
    //   console.log(this.items);
    //   this.cdr.detectChanges(); // Forzar la detección de cambios
    // }, 1000);
  }

  ngOnInit(): void {
  }

  async _finalizar(item:Tarea){
    item.completed = true;
    await this._taskServices_.Updatetarea(item.id, item).then(() => {
    }).catch((error: any) => {
      console.log(error);
    });
  }

  async getData(): Promise<void> {
    await this._taskServices_.Listofalltareas().then((data: any) => {
      if (data && data.length > 0) {
        this.items = data;
      }
      console.log(this.items);

    }).catch((error) => {
      console.log(error);
    });
  }


}
