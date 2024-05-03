import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() allComments: any[] = [];
  @Output() loadMore = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }
  

}
