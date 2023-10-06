import { Injectable, inject } from '@angular/core';

import { map } from 'rxjs/operators'

import { ToastrService } from 'ngx-toastr'

import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Categories } from '../models/categories';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private fireStore: AngularFirestore = inject(AngularFirestore)

  private toastr: ToastrService = inject(ToastrService)



  saveData(data: Categories) {
    this.fireStore.collection('category').add(data)
      .then(docRef => {
        console.log(docRef);
        this.toastr.success('save data is successfully ...!')

      })
      .catch(err => {
        this.toastr.error('data did not save error ...!')
        console.log(err);

        throw Error(err)

      })
  }

  getData() {
    return this.fireStore.collection('category').snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id

          return { data, id }
        })
      })
    )
  }

  editData(id: string, data: {}) {
    this.fireStore.doc(`category/${id}`).update(data)
      .then(docRef => {
        this.toastr.success('update data is successfully ...!')

      })
      .catch(err => {
        this.toastr.error('data did not update error ...!')
        throw Error(err)
      })
  }

  removeData(id: string) {
    this.fireStore.doc(`category/${id}`).delete()
      .then(docRef => {
        this.toastr.warning('remove data is successfully ...!')
      })
      .catch(err => {
        this.toastr.error('data did not remove error ...!')
        throw Error(err)
      })
  }

}
