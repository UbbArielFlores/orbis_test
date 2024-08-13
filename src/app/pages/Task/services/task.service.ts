import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient:HttpClient) { }

  Listofalltareas() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return new Promise((resolved, rejected) => {
      this.httpClient.get('http://localhost:8080/api/task', { headers }).subscribe((result: any) => {
        if (result != undefined) {
          resolved(result);
        } else {
          rejected(result);
        }
      }, (error) => {
        rejected(error);
      });
    });
  }

  Singletarea(id:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return new Promise((resolved, rejected) => {
      this.httpClient.get(`http://localhost:8080/api/task/${id}`, { headers }).subscribe((result: any) => {
        if (result != undefined) {
          resolved(result);
        } else {
          rejected(result);
        }
      }, (error) => {
        rejected(error);
      });
    });
  }

  Addtarea(tarea:Tarea) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const body = tarea;
    return new Promise((resolved, rejected) => {
      this.httpClient.post('http://localhost:8080/api/task', body, { headers }).subscribe((result: any) => {
        if (result != undefined) {
          resolved(result);
        }
        else {
          rejected(result);
        }
      }, (error) => {
        rejected(error);
      });
    });
  }

  Updatetarea(id:string, tarea:Tarea) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const body = tarea;
    return new Promise((resolved, rejected) => {
      this.httpClient.put(`http://localhost:8080/api/task/${id}`, body, { headers }).subscribe((result: any) => {
        if (result != undefined) {
          resolved(result);
        }
        else {
          rejected(result);
        }
      }, (error) => {
        rejected(error);
      });
    });
  }

  Deletetarea(id:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return new Promise((resolved, rejected) => {
      this.httpClient.delete(`http://localhost:8080/api/task/${id}`, { headers }).subscribe((result: any) => {
        if (result != undefined) {
          resolved(result);
        }
        else {
          rejected(result);
        }
      }, (error) => {
        rejected(error);
      });
    });
  }
}

export interface Tarea{
  id: string,
  title: string,
  completed : boolean,
}
