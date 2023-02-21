import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PATHS from "./paths";
import DashbaordLayout from "../layouts/DashboardLayout";
import checkPermission from "./../utils/checkPermissions";
import {
  USER_VIEW,
  ROLE_VIEW,
  ZONE_VIEW,
  SITE_VIEW,
  FIELD_MANAGEMENT,
  CLIENT_VIEW,
  PROJECT_VIEW,
  COMPANY_VIEW,
  FUNCTION_VIEW,
  LANGUAGE_VIEW,
  DEPARTMENT_VIEW,
  PERMISSION_VIEW,
  COMPANY_OR_CLIENT_VIEW,
  INFORMATION_VIEW,
} from "../utils/constants";

const Loadable = (Component) => (props) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};
export default function Router() {
  const user_view = checkPermission(USER_VIEW);
  const site_view = checkPermission(SITE_VIEW);
  const role_view = checkPermission(ROLE_VIEW);
  const zone_view = checkPermission(ZONE_VIEW);
  const field_view = checkPermission("feild_view");
  const field_manage = checkPermission(FIELD_MANAGEMENT);

  const client_view = checkPermission(CLIENT_VIEW);
  const project_view = checkPermission(PROJECT_VIEW);
  const company_view = checkPermission(COMPANY_VIEW);
  const language_view = checkPermission(LANGUAGE_VIEW);
  const permission_view = checkPermission(PERMISSION_VIEW);
  const information_view = checkPermission(INFORMATION_VIEW);
  const company_or_client_view = checkPermission(COMPANY_OR_CLIENT_VIEW);

  const auth = useSelector((data) => data.auth);

  const main_admin = useSelector(
    (state) => state.auth?.userDetail?.user?.role[0]
  );

  return useRoutes(
    auth.isLoggedIn && auth.userDetail
      ? [
        { path: "/", element: <Navigate to={PATHS.dashboard} /> },
        {
          path: PATHS.dashboard,
          element: <DashbaordLayout />,

          children: [
            {
              path: PATHS.dashboard,
              element: (
                <Navigate
                  to={
                    user_view && main_admin != "main_admin"
                      ? PATHS.users
                      : company_or_client_view
                        ? PATHS.clients
                        : permission_view || role_view
                          ? PATHS.rolepermission
                          : language_view
                            ? PATHS.localization
                            : company_view
                              ? PATHS.companies
                              : field_manage
                                ? PATHS.fieldManagement
                                : client_view || site_view || project_view || zone_view
                                  ? PATHS.clientSites
                                  : information_view
                                    ? PATHS.information
                                    : PATHS.Profile
                  }
                />
              ),
            },
            { path: PATHS.users, element: <Users /> },
            { path: PATHS.rolepermission, element: <RoleAndPermission /> },
            { path: PATHS.role, element: <Role /> },
            { path: PATHS.Profile, element: <Profile /> },
            { path: PATHS.fieldManagement, element: <FieldManagement /> },
            { path: PATHS.localization, element: <Localization /> },
            { path: PATHS.clientPreferences, element: <ClientPreferences /> },
            // { path: PATHS.clientSites, element: <ClientManagement /> },
            { path: PATHS.companies, element: <Companies /> },
            { path: PATHS.clients, element: <Clients /> },
            {
              path: PATHS.competencesettings,
              element: <CompetenceSettings />,
            },

            // Elearning
            { path: PATHS.emailTemplate, element: <EmailTemplate /> },
            { path: PATHS.addEmailTemplate, element: <AddEmailTemplate /> },

            { path: PATHS.workerDashboard, element: <Dashboard /> },
            { path: PATHS.myTranings, element: <MyTranings /> },
            { path: PATHS.training_detail, element: <TrainingDetail /> },
            { path: PATHS.MySeries, element: <MySeries /> },
            { path: PATHS.safetyCertificate, element: <SafetyCertificate /> },
            { path: PATHS.categories, element: <Categories /> },
            { path: PATHS.topics, element: <Topics /> },
            { path: PATHS.externalTraning, element: <ExternalTraning /> },
            { path: PATHS.requiredDocuments, element: <RequiredDocument /> },
            { path: PATHS.department, element: <Department /> },
            { path: PATHS.function, element: <Function /> },
            { path: PATHS.startQuiz, element: <StartQuiz /> },
            { path: PATHS.quizInstructions, element: <QuizInstructions /> },
            { path: PATHS.trueFalse, element: <TrueFalse /> },
            { path: PATHS.multipleChoice, element: <MultipleChoice /> },
            { path: PATHS.dragDropSorting, element: <DragDropSorting /> },
            {
              path: PATHS.dragDropIntrective,
              element: <DragDropIntractive />,
            },
            { path: PATHS.freeText, element: <FreeText /> },
            { path: PATHS.underReview, element: <UnderReview /> },
            { path: PATHS.passedQuiz, element: <PassedQuiz /> },
            { path: PATHS.failedQuiz, element: <FailedQuiz /> },
            { path: PATHS.certificate, element: <Certificate /> },
            { path: PATHS.invoiceHistory, element: <InvoiceHistory /> },
            { path: PATHS.invoice, element: <Invoice /> },
            { path: PATHS.checkout, element: <Checkout /> },

            { path: PATHS.tranings, element: <Tranings /> },
            { path: PATHS.traningSeries, element: <SeriesTraining /> },
            { path: PATHS.viewParticipant, element: <ViewParticipants /> },
            { path: PATHS.singleAddNewTraning, element: <SingleAddNewTraning /> },
            { path: PATHS.traningDetailModal, element: <TraningDetailModal /> },
            { path: PATHS.multipleAddNewTraning, element: <MultipleAddNewTraning /> },
            { path: PATHS.assignment, element: <Assignments /> },
            { path: PATHS.adminDashboard, element: <AdminDashboard /> },
            { path: PATHS.subContractor, element: <SubContractor /> },
            { path: PATHS.fieldManagement, element: <FieldManagement /> },

            { path: PATHS.competence, element: <Competence /> },
            { path: PATHS.workerDocuments, element: <WorkerDocuments /> },

          ],
        },
        // { path: "*", element: <Navigate to={PATHS.dashboard} /> },
      ]
      : [
        { path: "/", element: <Navigate to={PATHS.signin} /> },
        { path: PATHS.signin, element: <SignIn /> },
        { path: PATHS.resetpassword, element: <ResetPassword /> },
        { path: PATHS.newPassword, element: <NewPassword /> },
        { path: "*", element: <Navigate to={PATHS.signin} /> },
      ]
  );
}

const SignIn = Loadable(lazy(() => import("../pages/authentication/SignIn")));
const ResetPassword = Loadable(lazy(() => import("../pages/authentication/ResetPassword")));
const NewPassword = Loadable(lazy(() => import("../pages/authentication/NewPassword")));
const Users = Loadable(lazy(() => import("../pages/users/Users")));
const Profile = Loadable(lazy(() => import("../pages/profile/Profile")));
const RoleAndPermission = Loadable(lazy(() => import("../pages/roleAndPermission/RoleAndPermission")));

const Role = Loadable(lazy(() => import("../pages/roleAndPermission/Roles")));
// const ClientManagement = Loadable(lazy(() => import("../pages/clientManagement/CentManagementTabs")));

const Localization = Loadable(lazy(() => import("../pages/localization/Localization")));
const ClientPreferences = Loadable(lazy(() => import("../pages/localization/ClientPrefrence")));

const Companies = Loadable(lazy(() => import("../pages/companies/Companies")));
const Clients = Loadable(lazy(() => import("../pages/superClients/Clients")));
const CompetenceSettings = Loadable(lazy(() => import("../pages/competenceSetting/Categories")));

// Elearning
const EmailTemplate = Loadable(lazy(() => import("../pages/emailTemplate/ManageEmailTeplate")));
const AddEmailTemplate = Loadable(lazy(() => import("../pages/emailTemplate/AddNewEmailTemplate")));
const Dashboard = Loadable(lazy(() => import("../pages/workerArea/Dashboard")));
const MyTranings = Loadable(lazy(() => import("../pages/workerArea/MyTranings")));
const MySeries = Loadable(lazy(() => import("../pages/workerArea/MySeries")));
const SafetyCertificate = Loadable(lazy(() => import("../pages/workerArea/SafetyCertificate")));
const Categories = Loadable(lazy(() => import("../pages/competenceSetting/Categories")));
const Topics = Loadable(lazy(() => import("../pages/competenceSetting/Topics")));
const ExternalTraning = Loadable(lazy(() => import("../pages/competenceSetting/RequiredCertification")));
const RequiredDocument = Loadable(lazy(() => import("../pages/competenceSetting/RequiredDocument")));
const Department = Loadable(lazy(() => import("../pages/companies/Department")));
const Function = Loadable(lazy(() => import("../pages/companies/Function")));
const StartQuiz = Loadable(lazy(() => import("../pages/workerArea/StartQuizGetCertificate")));
const QuizInstructions = Loadable(lazy(() => import("../pages/workerArea/quiz/QuizInstructions")));
const TrueFalse = Loadable(lazy(() => import("../pages/workerArea/quiz/TrueFalse")));
const MultipleChoice = Loadable(lazy(() => import("../pages/workerArea/quiz/MultipleChoice")));
const DragDropSorting = Loadable(lazy(() => import("../pages/workerArea/quiz/DragDropSorting")));
const DragDropIntractive = Loadable(lazy(() => import("../pages/workerArea/quiz/DragDropIntractive")));
const FreeText = Loadable(lazy(() => import("../pages/workerArea/quiz/FreeText")));
const UnderReview = Loadable(lazy(() => import("../pages/workerArea/quiz/UnderReview")));
const PassedQuiz = Loadable(lazy(() => import("../pages/workerArea/quiz/PassedQuiz")));
const FailedQuiz = Loadable(lazy(() => import("../pages/workerArea/quiz/FailedQuiz")));
const Certificate = Loadable(lazy(() => import("../pages/workerArea/quiz/Certificate")));
const InvoiceHistory = Loadable(lazy(() => import("../pages/workerArea/InvoiceHistory")));
const Invoice = Loadable(lazy(() => import("../pages/workerArea/Invoice")));
const Checkout = Loadable(lazy(() => import("../pages/workerArea/Checkout")));
const Tranings = Loadable(lazy(() => import("../pages/adminArea/tranings/Tranings")));
const TrainingDetail = Loadable(lazy(() => import("../pages/adminArea/tranings/TrainingDetail")));
const SeriesTraining = Loadable(lazy(() => import("../pages/adminArea/tranings/SeriesTraining")));
const ViewParticipants = Loadable(lazy(() => import("../pages/adminArea/tranings/ViewParticipants")));
const SingleAddNewTraning = Loadable(lazy(() => import("../pages/adminArea/tranings/SingleAddNewTraning")));
const TraningDetailModal = Loadable(lazy(() => import("../pages/workerArea/TraningDetailModal")));
const MultipleAddNewTraning = Loadable(lazy(() => import("../pages/adminArea/tranings/MultipleAddNewTraning")));
const Assignments = Loadable(lazy(() => import("../pages/adminArea/correctAssignment/CorrectAssignment")));
const AdminDashboard = Loadable(lazy(() => import("../pages/competence/dashboard/Dashboard")));
const SubContractor = Loadable(lazy(() => import("../pages/SubContractor/SubContractor")));
const FieldManagement = Loadable(lazy(() => import("../pages/superAdmin/fieldManagement/FieldManagementTabs")));




const Competence = Loadable(
  lazy(() => import("../pages/competence/CompetenceTabs"))
);
const WorkerDocuments = Loadable(
  lazy(() => import("../pages/competence/WorkerDocument"))
);