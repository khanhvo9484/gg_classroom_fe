import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/default.layout";
import LandingPage from "../pages/public/home/landing.page";
import SignInLayout from "../layout/sign-in.layout";
import LoginForm from "../components/ui/form/login.form";
import SignUpForm from "../components/ui/form/signup.form";
import RequiredAuth from "../layout/required-auth.layout";
import RequiredNotAuth from "../layout/required-not-auth.layout";
import SignOut from "../components/signout.component";
import ProfilePage from "../pages/public/profile.page";
import HomePage from "../pages/public/home/home.page";
import SuccessPage from "@/pages/public/static/success.page";
import RecoverPasswordForm from "../components/ui/form/recover_password.form";
import VerifyEmail from "@/pages/public/verify.email.page";
import RecoveryChangePasswordForm from "@/components/ui/form/recovery-change-password.form";
import NotVerify from "@/pages/public/not.verify.page";
import VerifySignUpPage from "@/pages/public/static/verify-sign-up.page";
import Test from "@/pages/public/test";
import ClassPage from "@/pages/class-page/class.page";
import NewsClassPage from "@/pages/class-page/news-class.page";
import MembersPage from "@/pages/class-page/members.page";
import MainLayout from "@/layout/main.layout";
import AdminLayout from "@/layout/admin.layout";
import VerifyTokenInvitePage from "@/pages/public/static/verify-token-invite.page";
import ArchivedCoursesPage from "@/pages/public/archived.page";
import { RoleProvider } from "@/context/role.context";
import GradesPage from "@/pages/class-page/grades.page";
import GradeStructurePage from "@/pages/class-page/grade-structure.page";
// import StudentGradePage from "@/pages/class-page/student.grades.page";
import StudentViewGradePage from "@/pages/class-page/student-grade-page/student.grades.page";
import GradeReviewPost from "@/pages/class-page/ui/card-review-request";
import ReviewRequestPage from "@/pages/class-page/review-request-list/review-request-list.page";
import AllReviewRequestPage from "@/pages/ownclass.review.page";
import JoinedClassReviewRequestPage from "@/pages/joinedclass.review.page";
import RequiredAdmin from "@/layout/required-admin.layout";
import AdminAcountsPage from "@/pages/admin/admin.accounts.page";
import AdminCoursesPage from "@/pages/admin/admin.courses.page";
import RequiredUser from "@/layout/required-user.layout";
import NotFoundPage from "@/pages/public/invalid-page/not-found.page";
import UnauthorizedPage from "@/pages/public/invalid-page/unauthorized.page";

function App() {
  return (
    <Routes>
      <Route path="test" element={<Test></Test>} />

      <Route element={<DefaultLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<SignInLayout />}>
          <Route path="recover-password" element={<RecoverPasswordForm />} />
          <Route element={<RequiredNotAuth />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="sign-up" element={<SignUpForm />} />
            <Route path="auth/verify-email" element={<VerifyEmail />} />
            <Route
              path="auth/reset-password"
              element={<RecoveryChangePasswordForm />}
            />
            <Route path="not-verify" element={<NotVerify />} />
            <Route path="sign-up/verify" element={<VerifySignUpPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<RequiredAuth />}>
        <Route path="admin" element={<RequiredAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="home" element={"home"} />
            <Route path="accounts" element={<AdminAcountsPage />} />
            <Route path="courses" element={<AdminCoursesPage />} />
            <Route path="student-id" element={"student-id"} />
          </Route>
        </Route>
        <Route element={<RequiredUser />}>
          <Route element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="archived" element={<ArchivedCoursesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="calendar" element={<HomePage />} />
            <Route path="own-class-review" element={<AllReviewRequestPage />} />
            <Route
              path="joined-class-review"
              element={<JoinedClassReviewRequestPage />}
            />
            <Route path="archived" element={<HomePage />} />
            <Route path="setting" element={<HomePage />} />
            <Route
              path="course/:courseId"
              element={
                <RoleProvider>
                  <ClassPage />
                </RoleProvider>
              }
            >
              <Route path="news" element={<NewsClassPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="grades" element={<GradesPage />} />
              <Route
                path="student-view-grade"
                element={<StudentViewGradePage />}
              />
              <Route path="grade-review/" element={<ReviewRequestPage />} />
              <Route
                path="grade-review/:reviewId"
                element={<GradeReviewPost />}
              />
              <Route path="grade-structure" element={<GradeStructurePage />} />
              {/* <Route path="student-grades" element={<StudentGradePage />} /> */}
            </Route>
          </Route>
        </Route>
        <Route path="invite-course" element={<VerifyTokenInvitePage />} />

        <Route path="sign-out" element={<SignOut />} />
      </Route>

      <Route path="success-page" element={<SuccessPage />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
