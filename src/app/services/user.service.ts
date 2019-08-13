import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<User>;
  private users: Array<User>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<User>('user');
    this.userCollection.snapshotChanges().subscribe(
      response => {
        response.map(
          res => {
            const data = res.payload.doc.data();
            const id = res.payload.doc.id;
            if (this.users) {
              this.users.push(data);
            } else {
              this.users = new  Array<User>();
              this.users.push(data);
            }

          }
        );

      }
    );
    console.log(this.userCollection.get());
   }

   getUserCollection() {
     return this.userCollection.get().subscribe(
       response => {
         console.log(response.docs);
         console.log(response.metadata);
       }
     );
   }

   addUser(user: User) {
    const param = JSON.parse(JSON.stringify(user));
    return this.userCollection.add(param);
  }

}
