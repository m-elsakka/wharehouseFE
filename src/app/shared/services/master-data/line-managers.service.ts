import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseHttpCrudService} from "../base/base-http-crud.service";
import {SearchParPojo} from "../../model/searching-pojos/search.par.pojo.model";
import {FilterPojo} from "../../model/searching-pojos/filter.pojo";


@Injectable()
export class LineManagersService extends BaseHttpCrudService {

  serviceUrl: string;

  constructor(lineManagersHttp: HttpClient) {
    super(lineManagersHttp);
    this.serviceUrl = 'usermanagement/users-managers/';
  }

  getLineManagersByLevel(levelNumber: number) {
    const searchObj: SearchParPojo = new SearchParPojo();
    const levelFilter: FilterPojo = new FilterPojo();
    levelFilter.fieldName = 'userLevel';
    levelFilter.filter = '' + levelNumber;
    levelFilter.type = '2';
    searchObj.filtersList.push(levelFilter);
    return super.findWithSearchPojo(this.serviceUrl, searchObj);
  }

}
