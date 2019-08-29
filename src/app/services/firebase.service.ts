import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) {

  }


  public memberships() {

    return this.db.collection('memberships')
      .snapshotChanges();

  }

  public membership(id: string) {

    return this.db.collection('memberships', ref => ref.where('id', '==', id))
      .snapshotChanges();

  }

  public addMembership(membership) {

    return this.db.collection('memberships').add(membership);

  }

  public editMembership(id) {

    return this.db.collection('memberships',ref => ref.where('id', '==', id));

  }

  public deleteMembership(id) {

    return this.db.collection('memberships',ref => ref.where('id', '==', id));

  }

  public events() {

    return this.db.collection('events')
      .valueChanges();

  }

  public event(id: string) {

    return this.db.collection('events', ref => ref.where('id', '==', id))
      .snapshotChanges();

  }


  public deleteEvent(id) {

    return this.db.collection('events',ref => ref.where('id', '==', id));

  }

  public businessUsers() {

    return this.db.collection('businessUsers')
      .valueChanges();

  }

  public suspendBusinessUser(id) {

    return this.db.collection('businessUsers',ref => ref.where('id', '==', id));

  }

  public categories() {

    return this.db.collection('categories')
      .valueChanges();

  }

  public addCategory(category) {

    const key = "CAT" + new Date().getTime();

    category.key = key;

    return this.db.collection('categories').doc(key).set(category);

  }

  public removeCategory(key) {

    return this.db.collection('categories').doc(key).delete();
  }

}
