import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { emptySplitApi } from "./emptySplitApi";
import { API_END_POINTS } from "../config/ApiEndPoints";
import FORM_DATA_CONVERTER from "../utils/formDataConverter";
import DropdownResultsTransformer from "../utils/DropdownResults";
export const api = emptySplitApi.injectEndpoints({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    loginuser: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.login,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    forgetpassword: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.forgetpassword,
        method: "POST",
        body: { ...data },
      }),
    }),
    newpassword: builder.mutation({
      query: ({ data }) => {
        return {
          url: API_END_POINTS.updatePassword,
          method: "PUT",
          body: { ...data },
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: API_END_POINTS.logout,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.updateProfile,
        method: "POST",
        body: formData,
      }),
    }),
    addLanguageApi: builder.mutation({
      query: ({ formData, id }) => ({
        url: id ? `${API_END_POINTS.language}/${id}` : API_END_POINTS.language,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    setAdminDefaultLanguage: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.setAdminDefaultLanguage,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    updateLanguageStatusApi: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.updateLanguageStatus,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    updateKeywordsApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `${API_END_POINTS.languageTranslation}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getLanguage"],
    }),
    uploadKeywordsFiles: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.keywordTranslationUpload,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    // deleteLanguageApi: builder.mutation({
    //   query: (id) => ({
    //     url: `${API_END_POINTS.language}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["getLanguage", "languageDropdown"],
    // }),

    deleteLanguageApi: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.language,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    languageTranslationApi: builder.mutation({
      query: (id) => ({
        url: `${API_END_POINTS.languageTranslation}/${id}`,
        method: "GET",
      }),
    }),
    languageTranslation: builder.query({
      query: (id) => ({
        url: `${API_END_POINTS.languageTranslation}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "languageTranslationQuery", id },
      ],
    }),
    getLanguage: builder.query({
      query: ({ newUrl, params }) => {
        return {
          url: newUrl || API_END_POINTS.language,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, id) => [{ type: "getLanguage", id }],
    }),
    languageDropDown: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.languageDropDown,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data, true),
      providesTags: (result, error, id) => [{ type: "languageDropdown", id }],
    }),
    nativeOtherLangaugesDropdown: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.nativeOtherLangaugesDropdown,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [
        { type: "nativeOtherLangaugesDropdown", id },
      ],
    }),
    entityDropdown: builder.query({
      query: (companyId = "") => {
        return {
          url: API_END_POINTS.entityDropdown + companyId,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "entityDropdown", id }],
    }),
    addClientApi: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.clientAdd,
        method: "POST",
        body: data,
      }),
    }),
    getClientProjects: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getProject,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, id) => [{ type: "getClientProjects", id }],
    }),
    addClientProjects: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addProject,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getClientProjects"],
    }),
    deleteClientProjects: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.deleteProject,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["getClientProjects"],
    }),
    updateClientProjects: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.updateProject,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getClientProjects"],
    }),
    getClientSites: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.siteProject,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, id) => [{ type: "getClientSites", id }],
    }),

    getClientZones: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getZone,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, id) => [{ type: "getClientZones", id }],
    }),
    getRolesList: builder.query({
      query: (data) => {
        const { pageUrl, params } = data;
        const { company_id, range, search, per_page } = params;
        const url = pageUrl
          ? `${pageUrl}&company_id=${company_id ?? ""}&per_page=${
              per_page ?? ""
            }&range=${range ?? ""}&search=${search ?? ""}`
          : API_END_POINTS.getRoleList +
            `?company_id=${company_id ?? ""}&per_page=${per_page ?? ""}&range=${
              range ?? ""
            }&search=${search ?? ""}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "newRole", id }],
    }),
    getSiteDropdown: builder.query({
      query: (client_id) => {
        return {
          url: API_END_POINTS.siteDropdown,
          method: "GET",
          params: { client_id },
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
    }),
    getFunctionDropdown: builder.query({
      query: (companyId) => {
        return {
          url: `${API_END_POINTS.functionDropdown}${companyId}`,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
    }),
    getDepartmentDropdown: builder.query({
      query: (companyId) => {
        return {
          url: `${API_END_POINTS.departmentDropdown}${companyId}`,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      // providesTags: (result, error, id) => [{ type: "newRole", id }],
    }),

    getRoleDropdown: builder.query({
      query: (companyId) => {
        return {
          url: `${API_END_POINTS.companyRoleDropdown}/${companyId}`,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      // providesTags: (result, error, id) => [{ type: "newRole", id }],
    }),

    getCompanyPermissions: builder.mutation({
      query: (data) => {
        const { companyId, search } = data;
        // const { companyId, search } = data;
        return {
          // url: `${API_END_POINTS.getCompanyPermission}/${companyId}${search && '?search=' + search}`,
          url: `${API_END_POINTS.getCompanyPermission}/${companyId}`,
          method: "GET",
        };
      },
    }),
    addNewRole: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addNewRole,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["newRole", "roleDropDown", "companyRolePermission"],
    }),
    updateRole: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: id
            ? `${API_END_POINTS.updateRole}/${id}`
            : API_END_POINTS.updateRole,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["newRole", "roleDropDown"],
    }),
    roleDropDown: builder.query({
      query: (companyId = "") => {
        return {
          url: companyId
            ? `${API_END_POINTS.roleDropDown}/${companyId}`
            : API_END_POINTS.newRoleDropDown,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data, true),
      providesTags: (result, error, id) => [{ type: "roleDropDown", id }],
    }),
    givePermissionToRole: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.giveRolePermission,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["companyRolePermission"],
    }),
    revokePermissionToRole: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.revokeRolePermission,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["companyRolePermission"],
    }),

    getCompaniesList: builder.query({
      query: ({ params }) => {
        return {
          url: `${API_END_POINTS.componyDropDownList}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "getCompany", id }],
    }),
    getPermissionDropdown: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.permissionDropdown,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [
        { type: "getPersmissionDropdown", id },
      ],
    }),
    permissionListing: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.permissionsList,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "permissionsList", id }],
    }),
    createCompanySuper: builder.mutation({
      query: (formData) => {
        // const formData = new FormData();
        // for (const field in data) {
        //   if (field === "permission_id") {
        //     data.permission_id.map((permission, index) =>
        //       formData.append(`permission_id[${index}]`, permission)
        //     );
        //   } else {
        //     formData.append(`${field}`, data[field]);
        //   }
        // }
        return {
          url: API_END_POINTS.createCompany,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["managementCompanyList", "getCompany"],
    }),
    createCompany: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        for (const field in data) {
          if (field === "permission_id") {
            data.permission_id.map((permission, index) =>
              formData.append(`permission_id[${index}]`, permission)
            );
          } else {
            formData.append(`${field}`, data[field]);
          }
        }
        return {
          url: API_END_POINTS.createCompany,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["managementCompanyList", "getCompany"],
    }),

    createFunction: builder.mutation({
      query: ({ data }) => {
        return {
          url: API_END_POINTS.createFunction,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getFunctions"],
    }),

    createDepartment: builder.mutation({
      query: ({ data }) => {
        return {
          url: API_END_POINTS.createDepartment,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getDepartments"],
    }),

    getFunctions: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getFunctions,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, id) => [{ type: "getFunctions", id }],
    }),
    getDepartments: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getDepartments,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, id) => [{ type: "getDepartments", id }],
    }),
    managementCompanyList: builder.query({
      query: ({ url, params }) => {
        return {
          url: url || API_END_POINTS.managementCompanyList,
          method: "GET",
          params: params || {},
        };
      },
      providesTags: (result, error, id) => [
        { type: "managementCompanyList", id },
      ],
    }),
    updateStatusCompany: builder.mutation({
      query: (ids) => ({
        url: API_END_POINTS.updateStatusCompany,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["managementCompanyList", "getCompany"],
    }),

    // updateCompany: builder.mutation({
    //   query: ({ data, id }) => {
    //     const formData = new FormData();
    //     formData.append("_method", "put");

    //     for (const field in data) {
    //       if (field == "permission_id") {
    //         data.permission_id.map((permission, index) =>
    //           formData.append(`permission_id[${index}]`, permission)
    //         );
    //       } else {
    //         formData.append(`${field}`, data[field]);
    //       }
    //     }
    //     return {
    //       url: `${API_END_POINTS.updateCompany}/${[id]}`,
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: [
    //     "managementCompanyList",
    //     "getCompany",
    //     "permissionsList",
    //   ],
    // }),

    updateCompanyMaster: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `${API_END_POINTS.updateCompany}/${[id]}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [
        "managementCompanyList",
        "getCompany",
        "permissionsList",
      ],
    }),

    updateAdvanceCompany: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `${API_END_POINTS.updateCompanyAdvance}/${[id]}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [
        "managementCompanyList",
        "getCompany",
        "permissionsList",
      ],
    }),
    updateMasterCompany: builder.mutation({
      // query: ({ data, id }) => {
      //   return {
      //     url: `${API_END_POINTS.updateCompany}/${[id]}`,
      //     method: "PUT",
      //     body: data,
      //   };
      // },
      query: ({ data, id }) => {
        const formData = new FormData();
        formData.append("_method", "put");

        for (const field in data) {
          if (field === "permission_id") {
            data.permission_id.map((permission, index) =>
              formData.append(`permission_id[${index}]`, permission)
            );
          } else {
            formData.append(`${field}`, data[field]);
          }
        }
        return {
          url: `${API_END_POINTS.updateCompany}/${[id]}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [
        "managementCompanyList",
        "getCompany",
        "permissionsList",
      ],
    }),

    updateCompany: builder.mutation({
      query: ({ formData, id }) => {
        // const formData = new FormData();
        // formData.append("_method", "put");

        // for (const field in data) {
        //   if (field === "permission_id") {
        //     data.permission_id.map((permission, index) =>
        //       formData.append(`permission_id[${index}]`, permission)
        //     );
        //   } else {
        //     formData.append(`${field}`, data[field]);
        //   }
        // }
        return {
          url: `${API_END_POINTS.updateCompany}/${[id]}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [
        "managementCompanyList",
        "getCompany",
        "permissionsList",
      ],
    }),

    deleteCompany: builder.mutation({
      query: (ids) => ({
        url: API_END_POINTS.deleteCompany,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["managementCompanyList", "getCompany"],
    }),
    deleteDepartment: builder.mutation({
      query: (ids) => ({
        url: API_END_POINTS.deleteDepartment,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["getDepartments"],
    }),
    deleteFunction: builder.mutation({
      query: (ids) => ({
        url: API_END_POINTS.deleteFunction,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["getFunctions"],
    }),

    updateClientPreferences: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: API_END_POINTS.updateClientPreferences + id,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["managementCompanyList"],
    }),
    createEntities: builder.mutation({
      query: ({ data }) => {
        return {
          url: API_END_POINTS.createEntities,
          method: "POST",
          body: { ...data },
        };
      },
      invalidatesTags: ["getEntities"],
    }),
    getEntities: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.getEntities,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "getEntities", id }],
    }),
    createUser: builder.mutation({
      query: ({ data }) => {
        return {
          url: API_END_POINTS.createUser,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getUsers"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.updateUser,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getUsers"],
    }),
    updateUserAdvance: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.updateUser,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["getUsers"],
    }),

    updateDepartment: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.updateDepartment,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getUsers", "getDepartments"],
    }),
    // updateDepartment: builder.mutation({
    //   query: ({ data }) => {
    //     const { company_id, name, id } = data;
    //     const formData = new FormData();
    //     formData.append("_method", "put");
    //     formData.append("company_id", company_id);
    //     formData.append("id", id);
    //     formData.append("name[]", name);
    //     return {
    //       url: API_END_POINTS.updateDepartment,
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: ["getDepartments"],
    // }),
    // updateFunction: builder.mutation({
    //   query: ({ data }) => {
    //     const { company_id, name, id } = data;
    //     const formData = new FormData();
    //     formData.append("_method", "put");
    //     formData.append("company_id", company_id);
    //     formData.append("id", id);
    //     formData.append("name[]", name);

    //     return {
    //       url: API_END_POINTS.updateFunction,
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: ["getFunctions"],
    // }),

    updateFunction: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.updateFunction,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getUsers", "getFunctions"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ formData }) => {
        return {
          url: API_END_POINTS.updateUserStatus,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["getUsers"],
    }),
    getUsers: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getUsers,
          method: "GET",
          params: { ...params },
        };
      },
      providesTags: (result, error, id) => [{ type: "getUsers", id }],
    }),
    deleteUser: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.deleteUser,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getUsers"],
    }),
    addClients: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.clientAdd,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getClients"],
    }),
    getClients: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getClients,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, id) => [{ type: "getClients", id }],
    }),
    updateSiteClients: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.clientSiteUpdate,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getClients"],
    }),
    deleteSiteClients: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.clientSiteDelete,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getClients"],
    }),
    userListDropDown: builder.query({
      query: ({ params }) => {
        return {
          url: `${API_END_POINTS.userListDropDown}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "userListDropDown", id }],
    }),
    managerDropDown: builder.query({
      query: (companyId) => {
        return {
          url: companyId
            ? `${API_END_POINTS.managerDropDown}${companyId}`
            : API_END_POINTS.managerDropDown,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "managerDropDown", id }],
    }),
    reportToDropDown: builder.query({
      query: (companyId) => {
        return {
          url: `${API_END_POINTS.reportToDropDown}${companyId}`,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "reportToDropDown", id }],
    }),
    companyRolePermission: builder.query({
      query: (companyId) => {
        return {
          url: `${API_END_POINTS.companyRolePermission}/${companyId}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [
        { type: "companyRolePermission", id },
      ],
    }),

    addSites: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addSites,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getClientSites"],
    }),
    siteDelete: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.siteDelete,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getClientSites"],
    }),
    siteUpdate: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.siteUpdate,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getClientSites"],
    }),
    clientDropdown: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.clientDropdown,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "getClients", id }],
    }),
    addZone: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addZone,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getClientZones"],
    }),
    deleteZone: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.deleteZone,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getClientZones"],
    }),
    addCategoryCompetence: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addCategoryCompetence,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getCategoryCompetence", "categoryCompetenceDropdown"],
    }),
    getCategoryCompetence: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getCategoryCompetence,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [
        { type: "getCategoryCompetence", id },
      ],
    }),
    updateCategoryCompetence: builder.mutation({
      query: (data) => {
        return {
          url: `${API_END_POINTS.updateCategoryCompetence}`,
          method: "POST",
          body: data,
        };
      },

      invalidatesTags: ["getCategoryCompetence", "categoryCompetenceDropdown"],
    }),
    deleteCategoryCompetence: builder.mutation({
      query: (data) => ({
        url: `${API_END_POINTS.deleteCategoryCompetence}`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getCategoryCompetence", "categoryCompetenceDropdown"],
    }),
    categoryCompetenceDropdown: builder.query({
      query: ({ params }) => {
        const { company_id } = params;
        return {
          url: API_END_POINTS.categoryCompetenceDropdown + company_id,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [
        { type: "categoryCompetenceDropdown", id },
      ],
    }),
    getTopics: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getTopic,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getTopics", id }],
    }),
    topicDropdown: builder.query({
      query: (params) => {
        return {
          url: API_END_POINTS.topicDropdown,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "topicDropdown", id }],
    }),
    addTopics: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.addTopic,
          method: "POST",
          body: data,
        };
      },

      invalidatesTags: ["getTopics", "topicDropdown"],
    }),
    //deleteTopic
    deleteTopic: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.deleteTopic,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getTopics", "topicDropdown"],
    }),
    updateTopic: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.updateTopic,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getTopics", "topicDropdown"],
    }),

    addCertificate: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addCertificate,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getCertificates"],
    }),

    getCertificates: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getCertificates,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getCertificates", id }],
    }),
    deleteCertificate: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.deleteCertificate,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getCertificates"],
    }),

    updateCertificate: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.updateCertificate,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getCertificates"],
    }),
    updateStatusCertificate: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.updateStatusCertificate,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getCertificates"],
    }),
    addDocument: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addDocument,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getDocuments"],
    }),
    deleteDocuments: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.deleteDocuments,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getDocuments"],
    }),
    updateDocument: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.updateDocument,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getDocuments"],
    }),

    getDocuments: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.getDocuments,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getDocuments", id }],
    }),
    updateStatusDocument: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.updateStatusDocument,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getDocuments"],
    }),

    crudStatus: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudStatus,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getStatuses"],
    }),
    getStatuses: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudStatus,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getStatuses", id }],
    }),

    crudTypes: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudTypes,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getTypes", "typeDropdown"],
    }),
    getTypes: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudTypes,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getTypes", id }],
    }),
    typeDropdown: builder.query({
      query: (params) => {
        return {
          url: API_END_POINTS.typeDropdown,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "typeDropdown", id }],
    }),

    crudClassification: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudClassification,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getClassifications"],
    }),

    //crudBrands
    crudBrands: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudBrands,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getBrands"],
    }),

    getBrands: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudBrands,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getBrands", id }],
    }),
    // crudScafoldingCatagories

    crudScafoldingCatagories: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudScafoldingCatagories,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getScafoldingCatagories"],
    }),

    getScafoldingCatagories: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudScafoldingCatagories,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [
        { type: "getScafoldingCatagories", id },
      ],
    }),

    getClassifications: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudClassification,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getClassifications", id }],
    }),

    crudCategories: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudCategories,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getCategories", "infoCategoriesDropdown"],
    }),

    getCategories: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudCategories,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getCategories", id }],
    }),

    infoCategoriesDropdown: builder.query({
      query: (params) => {
        return {
          url: API_END_POINTS.infoCategoriesDropdown,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [
        { type: "infoCategoriesDropdown", id },
      ],
    }),

    crudInfoSubCategories: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudInfoSubCategories,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getSubCategories", "infoSubCategoriesDropdown"],
    }),

    crudSiteInspections: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudSiteInspections,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getSiteInspections"],
    }),

    getSubCategories: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudInfoSubCategories,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getSubCategories", id }],
    }),
    infoSubCategoriesDropdown: builder.query({
      query: (params) => {
        return {
          url: API_END_POINTS.infoSubCategoriesDropdown,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [
        { type: "infoSubCategoriesDropdown", id },
      ],
    }),

    getSiteInspections: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudSiteInspections,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getSiteInspections", id }],
    }),

    getSingleSiteInspections: builder.mutation({
      query: (id) => {
        return {
          url: API_END_POINTS.crudSiteInspections + "/" + id,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),

    crudInfoTags: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudInfoTags,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getInfoTags"],
    }),

    getInfoTags: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudInfoTags,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getInfoTags", id }],
    }),

    crudLmra: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudLmra,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getLmra", "lmraTemplateDropdown"],
    }),
    getSingleLmra: builder.mutation({
      query: (params) => ({
        url: API_END_POINTS.getSingleLmra,
        method: "GET",
        params: params,
      }),
    }),
    getLmra: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.crudLmra,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getLmra", id }],
    }),
    lmraTemplateDropdown: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.lmraTemplateDropdown,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [
        { type: "lmraTemplateDropdown", id },
      ],
    }),

    lmraWebDashboard: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.lmraWebDashboard,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
    }),
    lmraDashboardGraph: builder.query({
      query: (params) => {
        return {
          url: API_END_POINTS.lmraDashboardGraph,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
    }),

    projectDropdown: builder.query({
      query: (params) => {
        return {
          url: params
            ? API_END_POINTS.projectDropdown + "/" + params
            : API_END_POINTS.projectDropdown,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      providesTags: (result, error, id) => [{ type: "projectDropdown", id }],
    }),
    lmraInspectionReport: builder.query({
      query: (params) => {
        return {
          url: API_END_POINTS.lmraInspectionReport,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
    }),
    assignLmraInspection: builder.mutation({
      query: (body) => ({
        url: API_END_POINTS.assignLmraInspection,
        method: "POST",
        body,
      }),
    }),
    approveLmraAssignment: builder.mutation({
      query: (body) => ({
        url: API_END_POINTS.approveLmraAssignment,
        method: "POST",
        body,
      }),
    }),

    getAllTraining: builder.query({
      query: ({ params, sorting }) => {
        return {
          url: `${API_END_POINTS.getAllTraining}?${sorting}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getAllTraining", id }],
    }),
    deleteTraining: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.deleteTraining,
          method: "POST",
          body: formData,
        };
      },
    }),
    addTraining: builder.mutation({
      query: ({ formData, state }) => {
        return {
          url: state
            ? `${API_END_POINTS.addTraining}/${state?.training?.id}`
            : API_END_POINTS.addTraining,
          method: "POST",
          body: formData,
        };
      },
    }),
    getCategory: builder.query({
      query: ({ params }) => {
        return {
          url: API_END_POINTS.getCategoryCompetence,
          method: "GET",
          params,
        };
      },
    }),

    getFunctionsDropdown: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.getFunctions,
          method: "GET",
        };
      },
    }),
    addCommentOnTraining: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.addCommentOnTraining,
          method: "POST",
          body: data,
        };
      },
    }),
    getSingleTrainingList: builder.query({
      query: (id) => {
        return {
          url: API_END_POINTS.getSingleTrainingList,
          method: "GET",
          params: { id },
        };
      },
      transformResponse: (response) => response.data,
    }),

    getSingleTrainingListView: builder.query({
      query: ({ params }) => {
        return {
          url: API_END_POINTS.getSingleTrainingList,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
    }),

    deleteCommentOnTraining: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.deleteCommentOnTraining,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => response.data,
    }),
    updateCommentOnTraining: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.updateCommentOnTraining,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => response.data,
    }),
    getTrainingDetails: builder.query({
      query: (ids) => {
        return {
          url: `${API_END_POINTS.getTrainingDetails}?training_id=${ids.training_id}&user_id=${ids.user_id}`,
          method: "GET",
          // params: { training_id },
        };
      },
      transformResponse: (response) => response.data,
    }),

    addSeriesTraining: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.addSeriesTraining,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => response.data,
    }),
    getSeriesTraining: builder.query({
      query: (params) => {
        return {
          url: `${API_END_POINTS.getSeriesTraining}?${params}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),

    getTopic: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.getTopic,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getTopics", id }],
    }),
    getDepartmentsList: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.getDepartments,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "getDepartments", id }],
    }),

    deleteSeriesTraining: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.deleteSeriesTraining,
          method: "POST",
          body: formData,
        };
      },
    }),

    singleSeriesTraining: builder.query({
      query: (id) => {
        return {
          url: API_END_POINTS.singleSeriesTraining,
          method: "GET",
          params: { id },
        };
      },
      transformResponse: (response) => response.data,
    }),
    getDepartmentDropdownList: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.departmentDropdownList,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      // providesTags: (result, error, id) => [{ type: "newRole", id }],
    }),
    seriesTrainingList: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.seriesTrainingList,
          method: "GET",
        };
      },
      transformResponse: (response) =>
        DropdownResultsTransformer(response.data),
      // providesTags: (result, error, id) => [{ type: "newRole", id }],
    }),
    workerSubmitQuiz: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.workerSubmitQuiz,
          method: "POST",
          body: formData,
        };
      },
    }),
    getTeacherTraining: builder.query({
      query: ({ params }) => {
        return {
          url: `${API_END_POINTS.getTeacherTraining}`,
          method: "GET",
          params: { status: params },
        };
      },
    }),
    teacherTrainingQuestion: builder.query({
      query: ({ id }) => {
        return {
          url: `${API_END_POINTS.teacherTrainingQuestion}?training_id=${id}`,
          method: "GET",
        };
      },
    }),
    teacherTrainingRemarks: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.teacherTrainingRemarks,
          method: "POST",
          body: formData,
        };
      },
    }),
    crudTopicCertificates: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudTopicCertificates,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getTopicCerts"],
    }),
    getUserCertificateProfile: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.getTopicCerts,
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getTopicCerts", id }],
    }),
    deleteUserProfileCertificate: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `${API_END_POINTS.deleteUserProfileCertificate}/${id}`,
          method: "POST",
          body: formData,
        };
      },
    }),
    crudTopicDocuments: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.crudTopicDocuments,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getTopicDocuments"],
    }),
    getUserDocumentsProfile: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.getTopicDocumentsProfile,
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getTopicDocumentsProfile", id }],
    }),
    updateQrCode: builder.mutation({
      query: (params) => ({
        url: API_END_POINTS.updateQrCode,
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      // providesTags: (result, error, id) => [{ type: "getTopicDocuments", id }],
    }),
    deleteUserProfileDocument: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `${API_END_POINTS.deleteUserProfileDocument}/${id}`,
          method: "POST",
          body: formData,
        };
      },
    }),
    addLanguageApiAdvance: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.language,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    updateLanguageApiAdvance: builder.mutation({
      query: ({ formData, id }) => ({
        url: id ? `${API_END_POINTS.language}/${id}` : API_END_POINTS.language,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getLanguage", "languageDropdown"],
    }),
    getOldRolesList: builder.query({
      query: (data) => {
        return {
          url: API_END_POINTS.getRoleList,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "newRole", id }],
    }),
    // For New
    addNewRoleNew: builder.mutation({
      query: (data) => ({
        url: API_END_POINTS.addNewRole,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["newRole", "roleDropDown", "companyRolePermission"],
    }),

    updateDepartmentAdvanced: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.updateDepartment,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["getUsers", "getDepartments"],
    }),
    updateFunctionAdvanced: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.updateFunction,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["getUsers", "getFunctions"],
    }),
    updateCategoryCompetenceAdvanced: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.updateCategoryCompetence,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["getCategoryCompetence", "categoryCompetenceDropdown"],
    }),
    updateTopicAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.updateTopic,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getTopics", "topicDropdown"],
    }),
    updateCertificateAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.updateCertificate,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getCertificates"],
    }),
    updateDocumentAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.updateDocument,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getDocuments"],
    }),
    purchaseTraining: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.purchaseTraining,
        method: "POST",
        body: formData,
      }),
    }),

    getWorkerBadgeSettings: builder.query({
      query: (params) => {
        return {
          url: API_END_POINTS.workerBadgeSettings,
          method: "GET",
          params,
        };
      },
    }),

    workerBadgeSettings: builder.mutation({
      query: (data) => {
        return {
          url: API_END_POINTS.workerBadgeSettings,
          method: "POST",
          body: data,
        };
      },
    }),

    crudCategoriesAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.crudCategories,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getCategories", "infoCategoriesDropdown"],
    }),

    crudClassificationAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.crudClassification,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getClassifications"],
    }),

    crudStatusAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.crudStatus,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getStatuses"],
    }),

    crudInfoSubCategoriesAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.crudInfoSubCategories,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getSubCategories", "infoSubCategoriesDropdown"],
    }),

    crudInfoTagsAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.crudInfoTags,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getInfoTags"],
    }),

    crudTypesAdvanced: builder.mutation({
      query: (formData) => ({
        url: API_END_POINTS.crudTypes,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getTypes", "typeDropdown"],
    }),

    importCSVFile: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.importCSVFile,
          method: "POST",
          body: formData,
        };
      },
    }),

    getTopicCerts: builder.query({
      query: ({ pageUrl, params }) => ({
        url: pageUrl || API_END_POINTS.getTopicCerts,
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getTopicCerts", id }],
    }),
    getTopicDocuments: builder.query({
      query: ({ pageUrl, params }) => ({
        url: pageUrl || API_END_POINTS.getTopicDocuments,
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "getTopicDocuments", id }],
    }),
    getSingleUserDetail: builder.query({
      query: ({ params }) => {
        return {
          url: API_END_POINTS.getSingleUserDetail,
          method: "GET",
          params,
        };
      },
    }),
    addPinCode: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.addPinCode,
          method: "POST",
          body: formData,
        };
      },
    }),

    updatePinCode: builder.mutation({
      query: (formData) => {
        return {
          url: API_END_POINTS.updatePinCode,
          method: "PUT",
          body: formData,
        };
      },
    }),

    downloadTrainingCertificate: builder.mutation({
      query: (params) => {
        return {
          url: `${API_END_POINTS.downloadTrainingCertificate}?id=${params}`,
          method: "GET",
        };
      },
    }),

    // END
  }),
  overrideExisting: true,
});

export const {
  useGetSingleUserDetailQuery,
  useGetTopicDocumentsQuery,
  useGetTopicCertsQuery,
  useApproveLmraAssignmentMutation,
  useGetWorkerBadgeSettingsQuery,
  useAssignLmraInspectionMutation,
  useLmraInspectionReportQuery,
  useProjectDropdownQuery,
  useGetSingleSiteInspectionsMutation,
  useCrudLmraMutation,
  useGetSingleLmraMutation,
  useGetLmraQuery,
  useLmraWebDashboardQuery,
  useLmraDashboardGraphQuery,
  useLmraTemplateDropdownQuery,
  useCrudInfoTagsMutation,
  useGetInfoTagsQuery,
  useCrudInfoSubCategoriesMutation,
  useInfoCategoriesDropdownQuery,
  useInfoSubCategoriesDropdownQuery,
  useGetSubCategoriesQuery,
  useGetInfoSubCategoryQuery,
  useInfoCategoryDropdownQuery,
  useCrudSiteInspectionsMutation,
  useGetSiteInspectionsQuery,
  useCrudCategoriesMutation,
  useGetCategoriesQuery,
  useCrudScafoldingCatagoriesMutation,
  useGetScafoldingCatagoriesQuery,
  useCrudBrandsMutation,
  useGetBrandsQuery,
  useCrudClassificationMutation,
  useGetClassificationsQuery,
  useCrudTypesMutation,
  useGetTypesQuery,
  useTypeDropdownQuery,
  useCrudStatusMutation,
  useGetStatusesQuery,
  useUpdateStatusDocumentMutation,
  useDeleteDocumentsMutation,
  useGetDocumentsQuery,
  useUpdateDocumentMutation,
  useAddDocumentMutation,
  useUpdateStatusCertificateMutation,
  useGetCertificatesQuery,
  useDeleteCertificateMutation,
  useUpdateCertificateMutation,
  useAddCertificateMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
  useAddTopicsMutation,
  useGetTopicsQuery,
  useTopicDropdownQuery,
  useCategoryCompetenceDropdownQuery,
  useDeleteCategoryCompetenceMutation,
  useUpdateCategoryCompetenceMutation,
  useAddCategoryCompetenceMutation,
  useGetCategoryCompetenceQuery,
  useUpdateLanguageStatusApiMutation,
  useLoginuserMutation,
  useForgetpasswordMutation,
  useNewpasswordMutation,
  useLogoutMutation,
  useAddLanguageApiMutation,
  useDeleteLanguageApiMutation,
  useGetLanguageQuery,
  useLanguageTranslationQuery,
  useGetClientProjectsQuery,
  useGetClientZonesQuery,
  useGetClientSitesQuery,
  useGetRolesListQuery,
  useGetCompanyPermissionsMutation,
  useGivePermissionToRoleMutation,
  useRevokePermissionToRoleMutation,
  useAddNewRoleMutation,
  useGetCompaniesListQuery,
  useLanguageTranslationApiMutation,
  useManagementCompanyListQuery,
  useUpdateKeywordsApiMutation,
  useUpdateCompanyMutation,
  useUpdateCompanyMasterMutation,
  useCreateCompanyMutation,
  useCreateCompanySuperMutation,
  useDeleteCompanyMutation,
  useDeleteDepartmentMutation,
  useDeleteFunctionMutation,
  useCreateFunctionMutation,
  useCreateDepartmentMutation,
  useGetFunctionsQuery,
  useGetDepartmentsQuery,
  useGetSiteDropdownQuery,
  useGetPermissionDropdownQuery,
  usePermissionListingQuery,
  useGetFunctionDropdownQuery,
  useGetDepartmentDropdownQuery,
  useUpdateStatusCompanyMutation,
  useGetEntitiesQuery,
  useCreateEntitiesMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserAdvanceMutation,
  useUpdateDepartmentMutation,
  useUpdateFunctionMutation,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  useLanguageDropDownQuery,
  useNativeOtherLangaugesDropdownQuery,
  useRoleDropDownQuery,
  useEntityDropdownQuery,
  useUpdateClientPreferencesMutation,
  useGetRoleDropdownQuery,
  useGetEntityDropdownQuery,
  useAddClientsMutation,
  useGetClientsQuery,
  useAddSitesMutation,
  useUpdateRoleMutation,
  useUploadKeywordsFilesMutation,
  useUserListDropDownQuery,
  useManagerDropDownQuery,
  useReportToDropDownQuery,
  useCompanyRolePermissionQuery,
  useClientDropdownQuery,
  useSiteUpdateMutation,
  useSiteDeleteMutation,
  useAddZoneMutation,
  useDeleteZoneMutation,
  useSetAdminDefaultLanguageMutation,
  useDeleteSiteClientsMutation,
  useUpdateSiteClientsMutation,
  useAddClientProjectsMutation,
  useDeleteClientProjectsMutation,
  useUpdateClientProjectsMutation,
  useGetAllTrainingQuery,
  useDeleteTrainingMutation,
  useAddTrainingMutation,
  useGetCategoryQuery,
  useGetFunctionsDropdownQuery,
  useAddCommentOnTrainingMutation,
  useGetSingleTrainingListQuery,
  useGetSingleTrainingListViewQuery,
  useDeleteCommentOnTrainingMutation,
  useUpdateCommentOnTrainingMutation,
  useGetTrainingDetailsQuery,
  useAddSeriesTrainingMutation,
  useGetSeriesTrainingQuery,
  useGetTopicQuery,
  useGetDepartmentsListQuery,
  useDeleteSeriesTrainingMutation,
  useSingleSeriesTrainingQuery,
  useGetDepartmentDropdownListQuery,
  useSeriesTrainingListQuery,
  useWorkerSubmitQuizMutation,
  useGetTeacherTrainingQuery,
  useTeacherTrainingQuestionQuery,
  useTeacherTrainingRemarksMutation,
  useCrudTopicCertificatesMutation,
  useGetUserCertificateProfileQuery,
  useDeleteUserProfileCertificateMutation,
  useCrudTopicDocumentsMutation,
  useGetUserDocumentsProfileQuery,
  useDeleteUserProfileDocumentMutation,
  useAddLanguageApiAdvanceMutation,
  useUpdateLanguageApiAdvanceMutation,
  useGetOldRolesListQuery,
  useAddNewRoleNewMutation,
  useUpdateAdvanceCompanyMutation,
  useUpdateDepartmentAdvancedMutation,
  useUpdateFunctionAdvancedMutation,
  useUpdateCategoryCompetenceAdvancedMutation,
  useUpdateTopicAdvancedMutation,
  useUpdateCertificateAdvancedMutation,
  useUpdateDocumentAdvancedMutation,
  usePurchaseTrainingMutation,
  useUpdateQrCodeMutation,
  useWorkerBadgeSettingsMutation,
  useCrudCategoriesAdvancedMutation,
  useCrudClassificationAdvancedMutation,
  useCrudStatusAdvancedMutation,
  useCrudInfoSubCategoriesAdvancedMutation,
  useCrudInfoTagsAdvancedMutation,
  useCrudTypesAdvancedMutation,
  useImportCSVFileMutation,
  useUpdateMasterCompanyMutation,
  useAddPinCodeMutation,
  useUpdatePinCodeMutation,
  useDownloadTrainingCertificateMutation,
} = api;
