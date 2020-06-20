import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private static readonly COLLECTION_KEY = 'todos';
  public todos$: Observable<any>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.todos$ = this.firestore
      .collection(HomeComponent.COLLECTION_KEY)
      .valueChanges({ idField: 'id' });
  }

  public addTodo(text: string) {
    this.firestore.collection(HomeComponent.COLLECTION_KEY).add({
      text,
      done: false,
    });
  }

  public setDone(todo: Todo, done: boolean) {
    this.firestore
      .collection(HomeComponent.COLLECTION_KEY)
      .doc(todo.id)
      .update({ done });
  }

  public deleteTodo(todo: Todo) {
    this.firestore
      .collection(HomeComponent.COLLECTION_KEY)
      .doc(todo.id)
      .delete();
  }
}
