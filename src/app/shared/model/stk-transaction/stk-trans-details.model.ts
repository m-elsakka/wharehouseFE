import { StkTransDetailsCategoryModel } from './stk-trans-details-category.model';

export class StkTransDetailsModel {
  productiondate: Date;
  // itemno: string;
  transno: string;
  q_crt: number;
  branchno: string;
  // accqcrt: number;
  // itemprice: number;
  weight: number;
  category_code: string;

  stkTransDetailsCatgoryList: StkTransDetailsCategoryModel[];

  constructor() {
    this.stkTransDetailsCatgoryList = [];
  }
}
