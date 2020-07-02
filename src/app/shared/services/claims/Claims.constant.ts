import {BaseConstants} from '../base/base.constants';

export class ClaimsConstant {

  public static BASE_CLAIMS_URL =  'claims/';

  static GENERATE = ClaimsConstant.BASE_CLAIMS_URL + 'generate';

  static CHECK = ClaimsConstant.BASE_CLAIMS_URL+'check';

  static CONFIRM = ClaimsConstant.BASE_CLAIMS_URL+'confirm';

  static LOAD = ClaimsConstant.BASE_CLAIMS_URL+'load';

  static REPORT = ClaimsConstant.BASE_CLAIMS_URL+'report';
  
  static CALC_TOTAL = ClaimsConstant.BASE_CLAIMS_URL+'calctot';


  static DISTIBUTES_URL='cummdist/'

  static DIST_CREATE_URL = ClaimsConstant.DISTIBUTES_URL + BaseConstants.CREATE;

  static CLAIMS_UPDATE_URL = ClaimsConstant.BASE_CLAIMS_URL + "editClaims";


  // static SURVEY_FIND_PAGE_URL = SurveyConstant.BASE_SURVEY_URL + BaseConstants.FIND_LIST_PAGE_SPECIFICATION;

   //static CONDITION_TYPES_CREATE_URL = ConditionTypesConstant.BASE_CONDITION_TYPES_URL + BaseConstants.CREATE;

   //static CONDITION_TYPES_UPDATE_URL = ConditionTypesConstant.BASE_CONDITION_TYPES_URL + BaseConstants.EDIT;

  // static SURVEY_UPLOAD_URL = SurveyConstant.BASE_SURVEY_URL + 'uploadNewSurvey';

  // static SURVEY_EXPORT_URL = SurveyConstant.BASE_SURVEY_URL + 'surveyExcelReport';
}
