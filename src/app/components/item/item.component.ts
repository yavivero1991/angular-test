import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit{
  id: number | undefined
  item: Item | null = null
  loading: boolean = true
  private _unsubscribeAll: Subject<Item>;

  constructor(private _itemsService: ItemsService, private _router: Router){
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._itemsService.getItemSubject().pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.id = response
      if(this.id){
        this._itemsService.getItemById(this.id).then((data)=>{
          this.item = data
          this.loading = false
        })
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next({});
    this._unsubscribeAll.complete();
  }

  goBack(){
    this._router.navigate(['/items'])
  }

}
