import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { getDatabase, ref, push } from '@angular/fire/database';
import { StateService } from 'src/app/modules/shared/services/state/state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private state: StateService) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  create(user: any) {
    const { uid } = this.auth.currentUser!;
    user['uid'] = uid;
    const db = getDatabase();
    const dataRef = ref(db, `users`);
    return push(dataRef, user);
  }

  logout() {
    return signOut(this.auth);
  }

  getSession() {
    return this.auth;
  }
}
