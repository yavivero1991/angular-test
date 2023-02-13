import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit{
  allData: Item[] = []
  showData: Item[] = []
  data: Item[] = []
  page:number = 1;
	pageSize:number = 20;
	collectionSize: number = 0
  loading:boolean = true
  
  constructor(private _itemsService: ItemsService) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.loading = true
    this._itemsService.getItems().then((data)=>{
      this.allData = data || []
      this.collectionSize = this.allData.length
      this.refreshData()
      this.loading = false
    })
  }

  refreshData() {
		this.showData = this.allData.map((d, i) => ({...d })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  goToItem(item: Item){
    this._itemsService.setItemSubject(item?.id)    
  }
}
