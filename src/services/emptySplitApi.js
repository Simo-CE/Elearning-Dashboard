import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    //prepare headers work need to be done
    prepareHeaders : async (headers, {getState}) => {
      try{
        const token = getState().auth?.userDetail?.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        } else {
          headers.set('authorization', '')
        }
      } catch(err) {
        headers.set('authorization', '')
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    'getLanguage', 
    'languageTranslationQuery',
    'getClientProjects', 
    'getClientSites', 
    'getClientZones', 
    'companyPermission',
    'newRole',
    'managementCompanyList',
    'getCompany',
    'getFunctions',
    'getDepartments',
    'getEntities',
    'getUsers',
    'permissionsList',
    'getClients',
    'getSites',
    'userListDropDown',
    'managerDropDown',
    'reportToDropDown',
    'companyRolePermission',
    'nativeOtherLangaugesDropdown',
    'entityDropdown'
  ],
});
