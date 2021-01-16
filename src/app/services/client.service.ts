import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import{Observable} from 'rxjs';
import{Client} from '../models/Client'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
clientsCollection : AngularFirestoreCollection<Client>;
clientsDoc : AngularFirestoreDocument<Client>;
clients : Observable<Client[]>;
client : Observable<Client>;
  constructor(private afs:AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients',ref => ref.orderBy('lastName','asc'));
  }

  getClients():Observable<Client[]>{
    this.clients = this.clientsCollection.snapshotChanges()
    .pipe(map(changes=>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.clients;
  }
  newClient(client:Client){
    this.clientsCollection.add(client);
  }
  getClient(id:string):Observable<Client>{
  this.clientsDoc = this.afs.doc<Client>(`clients/${id}`);
  console.log(id);
  this.client = this.clientsDoc.snapshotChanges().pipe(map(action => {
    if(action.payload.exists === false) {
      return null;
    } else {
      const data = action.payload.data() as Client;
      data.id = action.payload.id;
      return data;
    }
  }));
return this.client;
  }
  updateClient(client:Client){
    this.clientsDoc = this.afs.doc<Client>(`client/${client.id}`);
    this.clientsDoc.update(client);
  }
  deletClient(client:Client){
    this.clientsDoc.delete();
  }
}
