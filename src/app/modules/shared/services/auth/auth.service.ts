import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { getDatabase, ref, push, get } from '@angular/fire/database';
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
    const db = getDatabase();
    const dataRef = ref(db, `users`);
    return push(dataRef, user);
  }

  logout() {
    return signOut(this.auth);
  }

  logoutClient() {
    return localStorage.clear();
  }

  getSession() {
    return this.auth;
  }

  getSessionUser() {
    return localStorage.getItem('token');
  }

  getSessionUserData() {
    if (localStorage.getItem('token')) {
      return JSON.parse(atob(localStorage.getItem('token')!));
    } else {
      return null;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      let docResult = null;
      const db = getDatabase();
      const userRef = ref(db, 'users');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const child = childSnapshot.val();
          if (child['email'] === email && child['password'] == btoa(password)) {
            docResult = child;
            delete docResult.password;
            return;
          }
        });
      }
      return docResult;
    } catch (error) {
      throw error;
    }
  }
}
