import { Injectable, inject } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private router: Router = inject(Router)
  private toastr: ToastrService = inject(ToastrService)
  private fireStore: AngularFirestore = inject(AngularFirestore)
  private fireStorage: AngularFireStorage = inject(AngularFireStorage)


  uploadImg(selectedImg: any, postData: Post, formStatus: string, id: string) {
    const filePath = `postIMG/${Date.now()}`

    this.fireStorage.upload(filePath, selectedImg)
      .then(() => {
        this.fireStorage.ref(filePath).getDownloadURL().subscribe(url => {
          postData.postImgPath = url

          if (formStatus === 'edit') {
            this.editData(id, postData)
          } else {

            this.saveData(postData)
          }


        })
      })



  }



  saveData(postData: Post) {
    this.fireStore.collection('posts').add(postData)
      .then(docRef => {
        this.toastr.success('post load succecfully ...!')
        this.router.navigate(['/posts'])
      })
      .catch(() => {

        this.toastr.error('post load error ...!')
      })
  }

  getData() {
    return this.fireStore.collection('posts').snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id

          return { data, id }
        })
      })
    )
  }

  loadSelectedData(id: string) {
    return this.fireStore.doc(`posts/${id}`).valueChanges()
  }

  editData(id: string, data: Post) {
    this.fireStore.doc(`posts/${id}`).update(data)
      .then(() => {
        this.toastr.warning('post edit succecfully ...!')
        this.router.navigate(['/posts'])
      })
  }

  removeData(id: string, postImage: string) {
    this.fireStore.doc(`posts/${id}`).delete()
      .then(() => {
        this.delteImg(postImage)
        this.toastr.error('post delted ...!')

      })
  }


  delteImg(imgPath: string) {
    this.fireStorage.refFromURL(imgPath).delete()
  }

  markFeatured(id: string, data: {}) {
    this.fireStore.doc(`posts/${id}`).update(data)
      .then(() => {
        this.toastr.info('post status update ...!')
      })
  }

}
