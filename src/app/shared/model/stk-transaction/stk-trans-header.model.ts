import { StkTransDetailsModel } from './stk-trans-details.model';

export class StkTransHeaderModel {
  transno: number;
  transdate: Date;
  transref: string;
  postdate: Date;
  status: string;
  accountc: string;
  branchno: string;
  accountd: string;
  transdesccode: string;
  accounttype: string;

  stkTransDetailsList: StkTransDetailsModel[];

  constructor() {
    this.stkTransDetailsList = [];
  }
}
