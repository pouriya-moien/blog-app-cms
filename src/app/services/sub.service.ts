import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  private toastr: ToastrService = inject(ToastrService)
  private fireStore: AngularFirestore = inject(AngularFirestore)


  loadSubData() {
    return this.fireStore.collection('subs').snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id

          return { data, id }
        })
      })
    )
    
  }

  delData(id:string) {
    this.fireStore.doc(`subs/${id}`).delete().then(()=>{
      this.toastr.info('deleted')
    })
  }

}
