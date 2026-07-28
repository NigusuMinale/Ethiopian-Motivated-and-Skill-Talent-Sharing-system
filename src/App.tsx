import React from "react";
import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import LandingPage from "@/pages/LandingPage";
import ForTalentPage from "@/pages/ForTalentPage";
import ForTalentDashboardPage from "@/pages/ForTalentDashboardPage";
import CompanyDashboardPageNew from "@/pages/CompanyDashboardPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import JobDetailPage from "@/pages/JobDetailPage";
import EducationPage from "@/pages/EducationPage";
import NotFound from "@/pages/not-found";

// Education Sub-pages
import EducationDashboard from "./components/Education/dashboard";
import CoursePage from "./components/Education/course";
import CertificatePage from "./components/Education/certeficat";
import SettingsPage from "./components/Education/setting";

// Company Sub-pages
import CompanyJobManagement from "./components/forcompany/job/index";
import CompanyTalentSearch from "./components/forcompany/selfall/index";
import CompanyTalentGroup from "./components/forcompany/Talentgroup/index";
import ProductAdvertisement from "./components/forcompany/productadvit/index";

// Talent Sub-pages
import TalentProfile from "./components/forTalent/profile/index";
import TalentSkills from "./components/forTalent/skill/index";

// Job Categories
import EngineeringJobs from "./components/jobs/engineering";
import FinanceJobs from "./components/jobs/finance";
import TechJobs from "./components/jobs/tech";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Switch>
            {/* Auth Pages */}
            <Route path="/" component={LandingPage} />
            <Route path="/forTalent" component={ForTalentPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />

            {/* Unified Dashboards (NEW) */}
            <Route path="/dashboard/talent" component={ForTalentDashboardPage} />
            <Route path="/dashboard/company" component={CompanyDashboardPageNew} />
            <Route path="/dashboard/education" component={EducationDashboard} />

            {/* Education Hub - Old Route (deprecated) */}
            <Route path="/education" component={EducationDashboard} />
            <Route path="/education/courses" component={CoursePage} />
            <Route path="/education/certificates" component={CertificatePage} />
            <Route path="/education/settings" component={SettingsPage} />

            {/* Company Dashboard */}
            <Route path="/company/dashboard" component={CompanyDashboardPageNew} />
            <Route path="/company/jobs" component={CompanyJobManagement} />
            <Route path="/company/talent" component={CompanyTalentSearch} />
            <Route path="/company/talent-groups" component={CompanyTalentGroup} />
            <Route path="/company/advertisements" component={ProductAdvertisement} />

            {/* Talent Profile */}
            <Route path="/talent/profile" component={TalentProfile} />
            <Route path="/talent/skills" component={TalentSkills} />

            {/* Job Listings */}
            <Route path="/jobs/engineering" component={EngineeringJobs} />
            <Route path="/jobs/finance" component={FinanceJobs} />
            <Route path="/jobs/tech" component={TechJobs} />
            <Route path="/jobs/:id" component={JobDetailPage} />

            {/* Fallback */}
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;