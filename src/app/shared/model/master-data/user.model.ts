import { AuthorityModel } from './authority.model';

export class UserModel {
  user_name: string;
  password: string;
  authorities: AuthorityModel[];
  encrypted: boolean;
  token: string;

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
