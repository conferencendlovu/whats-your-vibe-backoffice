import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  public getTotalCheckins() {
    return this.db.collection("viber_checkins").valueChanges();
  }

  public getTotalBusiness() {
    return this.db.collection("businessUsers").valueChanges();
  }

  public getTotalVibers() {
    return this.db.collection("vibers").valueChanges();
  }

  public getTotalEvents() {
    return this.db.collection("vibes").valueChanges();
  }

  public updateEventStatus(event) {
    return this.db
      .collection("vibes")
      .doc(event.id)
      .update({ status: event.status });
  }

  public deleteEvent(id) {
    return this.db.collection("vibes", ref => ref.where("id", "==", id));
  }

  public events() {
    return this.db.collection("vibes").snapshotChanges();
  }

  public businessUsers() {
    return this.db.collection("businessUsers").snapshotChanges();
  }

  public vibers() {
    return this.db.collection("vibers").snapshotChanges();
  }

  public suspendBusinessUser(id) {
    return this.db.collection("businessUsers", ref =>
      ref.where("id", "==", id)
    );
  }

  public getCategories() {
    return this.db
      .collection("categories", ref => ref.orderBy("title"))
      .snapshotChanges();
  }

  public addCategory(category) {
    const key = "CAT" + new Date().getTime();

    category.key = key;

    return this.db
      .collection("categories")
      .doc(key)
      .set(category);
  }

  public editCategory(category) {
    return this.db
      .collection("categories")
      .doc(category.key)
      .update(category);
  }

  public removeCategory(key) {
    return this.db
      .collection("categories")
      .doc(key)
      .delete();
  }
}
