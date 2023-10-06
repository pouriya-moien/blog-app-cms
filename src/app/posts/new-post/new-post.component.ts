import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {



  permalink!: string
  imgSrc: any = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
  selectedImg: any

  categories: any

  postForm!: any

  formStatus: string = 'add'

  docId!: string

  private categoryService: CategoriesService = inject(CategoriesService)

  private postService: PostsService = inject(PostsService)

  private formBuilder: FormBuilder = inject(FormBuilder)

  private activeRoute: ActivatedRoute = inject(ActivatedRoute)


  constructor() {

  }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe((q: any) => {

      this.docId = q.id

      if (this.docId) {
        this.postService.loadSelectedData(q.id).subscribe((post: any) => {
          this.postForm = this.formBuilder.group({
            title: [post.title, [Validators.required, Validators.minLength(15)]],
            permalink: [post.permalink, Validators.required],
            excerpt: [post.excerpt, [Validators.required, Validators.minLength(60)]],
            category: [`${post.category.categoryId}-${post.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [post.content, [Validators.required, Validators.minLength(100)]]
          })

          this.imgSrc = post.postImgPath
          this.formStatus = 'edit'
        })
      } else {
        this.postForm = this.formBuilder.group({
          title: ['', [Validators.required, Validators.minLength(15)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(60)]],
          category: [``, Validators.required],
          postImg: ['', Validators.required],
          content: ['', [Validators.required, Validators.minLength(100)]]
        })
      }

    })


    

    this.categoryService.getData().subscribe(val => {
      this.categories = val
    })

  }

  get fc() {
    return this.postForm.controls
  }


  titleHandler(e: KeyboardEvent) {
    let title: string = (e.target as HTMLInputElement).value

    this.permalink = title.replace(/\s/g, '-')

    console.log(this.permalink);

  }

  imgPreviw(e: any) {

    const reader = new FileReader()

    reader.onload = r => {
      this.imgSrc = r.target?.result
    }

    reader.readAsDataURL(e.target.files[0])
    this.selectedImg = e.target.files[0]
  }

  onSubmit() {
    console.log(this.postForm.value);

    let spilited = this.postForm.value.category.split('-')

    const postData: Post = {
      title: this.postForm.value.title,
      excerpt: this.postForm.value.excerpt,
      permalink: this.postForm.value.permalink,
      category: {
        category: spilited[1],
        categoryId: spilited[0]
      },
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: new Date()
    }

    this.postService.uploadImg(this.selectedImg, postData, this.formStatus, this.docId)

    console.log(postData);

    this.postForm.reset()

    this.imgSrc = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"

  }

}
