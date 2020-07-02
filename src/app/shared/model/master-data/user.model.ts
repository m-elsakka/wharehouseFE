import {AuthorityModel} from './authority.model';

export class UserModel {

  username: string;
  password: string;
  authorities: AuthorityModel[];
  
  constructor() {
    this.authorities = [];
  }
}
