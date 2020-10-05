import { StkTransDetailsCategoryModel } from './stk-trans-details-category.model';

export class StkTransDetailsModel {
  productiondate: any;
  // itemno: string;
  transNo: string;
  qCrt: number;
  branchno: string;
  // accqcrt: number;
  // itemprice: number;
  catWeight: number;
  categoryCode: string;
  categoryNamee: string;
  categoryNamea: string;

  stkTransCategoryList: StkTransDetailsCategoryModel[];

  constructor() {
    this.stkTransCategoryList = [];
  }
}
