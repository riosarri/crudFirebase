import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { TaskI } from '../models/task.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosCollection: AngularFirestoreCollection<TaskI>;
  private todos: Observable<TaskI[]>;

  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<TaskI>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map (response => {
          const data = response.payload.doc.data();
          const id = response.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todosCollection.doc<TaskI>(id).valueChanges();
  }

  addTodo(todo: TaskI) {
    return this.todosCollection.add(todo);
  }

  updateTodo(todo: TaskI, id:string) {
    return this.todosCollection.doc<TaskI>(id).update(todo);
  }

  removeTodo(id: string) {
    return this.todosCollection.doc<TaskI>(id).delete();
  }

}
