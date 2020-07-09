import { HttpHeaders } from '@angular/common/http';

export class BaseConstants {

  // Base URLs
  static BASE_TRANS_URL = 'transactions';
 static BASE_MASTER_DATA_URL = 'masterdata';

  // Function URLs
  static FIND_ALL = 'findAll';
  static FIND_LIST_PAGE_SPECIFICATION = 'findListPagesBySpecifications';
  static FIND_LIST_SPECIFICATION = 'findListBySpecifications';
  static CREATE = 'create';
  static EDIT = 'edit';
  static DELETE = 'delete';
  static FIND_BY_ID = 'findById';

  // Master date URLs
  static PARAMETERS_URL= 'parameters/' + BaseConstants.FIND_ALL;
  static CONDITION_TYPES_URL= 'conditionTypes/' + BaseConstants.FIND_ALL;
  static DISTIBUTES_URL='cummdist/';


  // static REGION_MASTER_URL = BaseConstants.BASE_MASTER_DATA_URL + '/regions/' + BaseConstants.FIND_LIST_SPECIFICATION;
  // static SALES_SECTOR_MASTER_URL = BaseConstants.BASE_MASTER_DATA_URL + '/salesector/' + BaseConstants.FIND_LIST_SPECIFICATION;
  // static SURVEY_TYPES_MASTER_URL = BaseConstants.BASE_MASTER_DATA_URL + '/survey-types/' + BaseConstants.FIND_ALL;
  // static SURVEY_QUESTIONS_TYPES_MASTER_URL = BaseConstants.BASE_MASTER_DATA_URL + '/question-type/' + BaseConstants.FIND_ALL;

  // -----------------------------------------------
  // Headers Keys
  static HTTP_OPTIONS = new HttpHeaders();
  static CONTENT_TYPE_KEY = 'Content-Type';
  static ACCEPT_KEY = 'Accept';
  static APPLICATION_JSON = 'application/json';
  static LOCAL_KEY = 'LOCAL';
  static LOCAL_EN_VALUE = 'en';
  static APP_VERSION = 'appVersion';

}
