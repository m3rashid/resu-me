import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import Header from "./components/header";
import Footer from "./components/footer";
import NotFound from "./components/notFound";
import dataContext, {
  IResumeData,
  initialState,
} from "./components/dataContext";

const Home = React.lazy(() => import("./pages/home"));
const AboutYou = React.lazy(() => import("./pages/slider/aboutYou"));
const ChooseTemplate = React.lazy(() => import("./pages/slider/chooseTemlate"));
const Contact = React.lazy(() => import("./pages/slider/contact"));
const Education = React.lazy(() => import("./pages/slider/education"));
const Experience = React.lazy(() => import("./pages/slider/experience"));
const Interests = React.lazy(() => import("./pages/slider/interests"));
const Skills = React.lazy(() => import("./pages/slider/skills"));
const ResumeTheme = React.lazy(() => import("./pages/slider/theme"));

const App = () => {
  const { pathname } = useLocation();
  const [resumeData, setResumeData] = React.useState<IResumeData>(initialState);

  return (
    <React.Suspense
      fallback={
        <Center h="200px">
          <Spinner />
        </Center>
      }
    >
      <Header isHome={pathname === "/"} />
      <div className="router-inner">
        <dataContext.Provider
          value={{ data: resumeData, setData: setResumeData }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create">
              <Route path="" element={<Navigate to="/create/template" />} />
              <Route path="template" element={<ChooseTemplate />} />
              <Route path="about" element={<AboutYou />} />
              <Route path="education" element={<Education />} />
              <Route path="experience" element={<Experience />} />
              <Route path="skills" element={<Skills />} />
              <Route path="interests" element={<Interests />} />
              <Route path="contact" element={<Contact />} />
              <Route path="theme" element={<ResumeTheme />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </dataContext.Provider>
      </div>
      <Footer />
    </React.Suspense>
  );
};

export default App;
