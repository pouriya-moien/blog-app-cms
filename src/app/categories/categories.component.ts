import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Categories } from '../models/categories';


// import {Firestore,collectionData, collection,addDoc  } from '@angular/fire/firestore'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesService = inject(CategoriesService)

  categoryFormValue!: string
  categoriesData!: any


  formStatus: string = 'add'


  categoryId!: string

  ngOnInit(): void {
    this.categoriesService.getData().subscribe(data => {
      console.log(data);

      this.categoriesData = data
    })


  }

  submitHandler() {

    let newCtegory: Categories = {
      category: this.categoryFormValue
    }

    if (this.formStatus === 'add') {

      this.categoriesService.saveData(newCtegory)
      console.log(this.categoriesData);
      this.categoryFormValue = ' '
    } else if (this.formStatus === 'edit') {
      this.categoriesService.editData(this.categoryId, newCtegory)
      this.formStatus = 'add'
      this.categoryFormValue = ' '
    }

    // this.fireStore.collection('category').add(newCtegory)
    //   .then(docRef => {

    //     // this.fireStore.doc(`category/${docRef.id}`).collection('subCategory').add(newSubCtegory)
    //     // console.log(docRef);

    //     // this.fireStore.collection('category').doc(docRef.id).collection('sub').add(newSubCtegory)
    //     //   .then(subDocRef => {
    //     //     console.log(subDocRef);

    //     //   })

    //   })
    //   .catch(err => {
    //     console.log(err);

    //   })
    console.log('work');

  }


  onEditHandler(category: string, categoryId: string) {
    console.log(category);
    this.categoryFormValue = category
    this.formStatus = 'edit'
    this.categoryId = categoryId

  }

  onDeleteHandler(id: string) {
    this.categoriesService.removeData(id)
  }

}
