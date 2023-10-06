import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {


  postsData: any

  private postService: PostsService = inject(PostsService)


  ngOnInit(): void {
    this.postService.getData().subscribe(data => {
      this.postsData = data
    })
  }

  onDelete(id: string, imgPath: string) {
    this.postService.removeData(id, imgPath)
  }

  onFeatured(id: string, fu: boolean) {

    const isFeaturedData = {
      isFeatured:fu
    }
    this.postService.markFeatured(id,isFeaturedData)
  }

}
