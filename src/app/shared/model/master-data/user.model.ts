import { AuthorityModel } from './authority.model';
import { CabinetModel } from './cabinet.model';

export class UserModel {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  jobDescription: string;
  // userLevelId: number;
  active: number;
  activeFlag: boolean;
  // lineManagerId: number;
  branchNo: string;
  // isS2AccountFlag: boolean;
  // isS2Account: number;
  password: string;
  confirmedPassword: string;
  authorities: AuthorityModel[];
  stkCabinetList: CabinetModel[];

  constructor() {
    this.authorities = [];
    this.stkCabinetList = [];
  }
}
