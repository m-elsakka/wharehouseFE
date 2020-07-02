import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//import {SurveyGroupListComponent} from './survey-group/survey-group-list/survey-group-list.component';
//import {SurveyListComponent} from './survey/survey-list/survey-list.component';
//import {AddSurveyGroupAssignComponent} from './survey-group-assign/add-survey-group-assing/add-survey-group-assign.component';
//import {EditSurveyGroupAssignComponent} from './survey-group-assign/edit-survey-group-assign/edit-survey-group-assign.component';
//import {TeamLeadAssignListComponent} from './team-lead-assign/team-lead-assign-list/team-lead-assign-list.component';
//import {TeamLeadAssignComponent} from './team-lead-assign/team-lead-assign/team-lead-assign.component';
//import {UserListComponent} from './user-hier/user-list/user-list.component';
//import {OnePagerListComponent} from './one-pager/one-pager-list/one-pager-list.component';
import {ParametersComponent} from './parameters/parameters.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {ConditionTypesComponent} from './condition-types/condition-types.component';
import {ClaimsComponent} from './claims/claims.component';

//import {AuthoritiesGuardService} from '../../shared/services/auth/authorities-guard.service';


const routes: Routes = [
  {
    path: 'parameters',
    component: ParametersComponent,
    data: {
      title: 'Parameters'
    }
  },
  {
    path: 'conditionTypes',
    component: ConditionTypesComponent,
    data: {
      title: 'Condtion Types'
    }
  },
  {
    path: 'claims',
    component: ClaimsComponent,
    data: {
      title: 'Claims'
    }
  },
  
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    data: {
      title: 'Access Denied'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule {
}
