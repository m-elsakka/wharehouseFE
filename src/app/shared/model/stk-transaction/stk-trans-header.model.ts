import { StkTransDetailsModel } from './stk-trans-details.model';

export class StkTransHeaderModel {
  transNo: number;
  transDate: any;
  transRef: string;
  postDate: Date;
  status: string;
  accountc: string;
  branchno: string;
  accountd: string;
  // transdesccode: string;
  // accounttype: string;

  stkTransDetailsList: StkTransDetailsModel[];

  constructor() {
    this.stkTransDetailsList = [];
  }
}
