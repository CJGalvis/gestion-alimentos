import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { StateService } from 'src/app/modules/shared/services/state/state.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private auth: Auth, private state: StateService) {}

  getOrders() {
    const db = getDatabase();
    const starCountRef = ref(db, `orders`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataList = [];
      for (let key in data) {
        dataList.push(data[key]);
      }
      this.state.stateOrders.next(dataList);
    });
  }
}
