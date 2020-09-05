import { SearchParPojo } from 'src/app/shared/model/searching-pojos/search.par.pojo.model';
import { BaseHttpCrudService } from 'src/app/shared/services/base/base-http-crud.service';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormActionHandler } from './form.action.handler';
import { SortPojo } from 'src/app/shared/model/searching-pojos/sort-pojo';
import swal from 'sweetalert2';

export class BaseListComponent extends FormActionHandler {
  itemList: any[];
  temp: any[];
  selectedItem: any;
  dataTableCount: number;
  searchingObject: SearchParPojo;
  renderForm: boolean;
  serviceURL: string;
  isUpdateMode: boolean;
  newItem: any;

  constructor(
    private toastSer: ToastService,
    private spinnerSer: NgxSpinnerService,
    private crudSer: BaseHttpCrudService
  ) {
    super(toastSer, spinnerSer);
    this.renderForm = false;
  }

  init() {
    this.resetDataTable();
    this.setPage({ offset: 0 });
  }

  onSearch() {
    this.setPage({ offset: 0 });
  }

  onAddItem(item: any) {
    this.openFrom(item, false);
  }

  onEdit(item: any) {
    this.openFrom(item, true);
  }

  deleteItem(itemId: any) {
    swal
      .fire({
        title: '',
        text:
          'Are you sure you want to delete this item, Changes will be discard?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      })
      .then((result) => {
        if (result.value) {
          this.crudSer.deleteItem(this.serviceURL, itemId).subscribe(
            (data: any) => {
              this.spinnerSer.hide();
              this.toastSer.setSuccessMsg('Item deleted.', '');
              this.onSearch();
            },
            (error: any) => {
              this.handleFailure(error);
            }
          );
        }
      });
  }

  openFrom(item: any, isUpdateMode: boolean) {
    this.selectedItem = item;
    this.renderForm = true;
    this.isUpdateMode = isUpdateMode;
  }

  updateView(renderEventValue: { renderForm: boolean }) {
    this.renderForm = renderEventValue.renderForm;
    // this.resetDataTable();
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo: any) {
    this.spinnerSer.show();
    if (pageInfo.offset === 0) {
      this.searchingObject.page = 0;
    } else if (pageInfo.offset) {
      this.searchingObject.page = pageInfo.offset;
    }

    if (pageInfo.newValue && pageInfo.column && pageInfo.column.prop) {
      let sortObj: SortPojo = new SortPojo();
      sortObj.fieldName = pageInfo.column.prop;
      sortObj.sortDirection = pageInfo.newValue;
      this.searchingObject.sortObject = sortObj;
    }

    this.crudSer
      .findPageWithSearchPojo(this.serviceURL, this.searchingObject)
      .subscribe(
        (data: any) => {
          let returnedObj;
          returnedObj = this.handleSuccess(data);
          this.itemList = returnedObj.data;
          this.temp = [...this.itemList];
          this.dataTableCount = returnedObj.totalElements;
        },
        (error: any) => {
          this.itemList = this.handleFailure(error);
        }
      );
  }

  resetDataTable() {
    this.itemList = [];
    this.temp = [];
    this.searchingObject = new SearchParPojo();
    this.dataTableCount = this.searchingObject.size;
  }
}
