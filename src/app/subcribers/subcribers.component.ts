import { Component, OnInit, inject } from '@angular/core';
import { SubService } from '../services/sub.service';

@Component({
  selector: 'app-subcribers',
  templateUrl: './subcribers.component.html',
  styleUrls: ['./subcribers.component.css']
})
export class SubcribersComponent implements OnInit {


  subService = inject(SubService)

  subs:any

  ngOnInit(): void {

    this.subService.loadSubData().subscribe(sub => {
      this.subs = sub      
    })

  }

  onDelete(id:string) {
    this.subService.delData(id)
  }

}
