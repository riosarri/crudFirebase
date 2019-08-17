import { Component, OnInit } from '@angular/core';
import { TaskI } from 'src/app/models/task.interface';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: TaskI = {
    task: '',
    priority: 0
  };
  todoId = null;

  constructor(
    private route: ActivatedRoute, private nav: NavController,
    private todoService: TodoService, private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }
  }

  async loadTodo() {
    // Loader customizado con icono en gif
    const loading = await this.loadingController.create({
      spinner: null,
      message: '<img class="imagen" alt="W3Schools" src="../../../assets/igorLogo.png" height="119px">',
      //message : '<strong>Cargando...</strong>',
      cssClass: 'custom-loader-class'
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(res => {
      
      this.todo = res;
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();

    if (this.todoId) {
      // Update
      this.todoService.updateTodo(this.todo, this.todoId).then(
        () => {
          loading.dismiss();
          this.nav.navigateForward('/');
        }
      );
    } else {
      // New
      this.todoService.addTodo(this.todo).then(
        () => {
          loading.dismiss();
          this.nav.navigateForward('/');
        }
      );
    }
  }

  removeTodo(todoId: string) {
    this.todoService.removeTodo(todoId).then(
      () => {
        alert('Tarea Eliminada');
        this.nav.navigateForward('/');
      }
    )
  }

}
