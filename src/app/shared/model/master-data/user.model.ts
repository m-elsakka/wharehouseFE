import { AuthorityModel } from './authority.model';

export class UserModel {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  jobDescription: string;
  userLevelId: number;
  active: number;
  activeFlag: boolean;
  lineManagerId: number;
  branchNo: string;
  isS2AccountFlag: boolean;
  isS2Account: number;
  password: string;
  confirmedPassword: string;
  authorities: AuthorityModel[];

  // constructor(
  //   username?: string,
  //   password?: string,
  //   encrypted?: boolean,
  //   token?: string
  // ) {
  //   this.userName = username;
  //   this.password = password;
  //   this.encrypted = encrypted;
  //   this.token = token;
  //   this.authorities = [];
  // }
}
