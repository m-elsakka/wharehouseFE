import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpCrudService } from '../base/base-http-crud.service';
import { MasterDataConstant } from './master-data.constant';
import { SearchParPojo } from '../../model/searching-pojos/search.par.pojo.model';
import { ItemModel } from '../../model/master-data/item.model';

@Injectable()
export class ItemService extends BaseHttpCrudService {
  serverUrl: string;

  constructor(private itemHttpSer: HttpClient) {
    super(itemHttpSer);
    this.serverUrl = MasterDataConstant.ITEM_BASE;
  }

  saveItems(item: ItemModel) {
    return super.saveItem(this.serverUrl, item, true);
  }

  getAllItems() {
    return super.findAll(this.serverUrl);
  }

  getItemsListBySearchObject(searchObject: SearchParPojo) {
    return super.findWithSearchPojo(this.serverUrl, searchObject);
  }
}
