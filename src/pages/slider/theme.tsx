import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import CreateWrapper from "../../components/createWrapper";
import dataContext from "../../components/dataContext";
import TemplateOne from "../../components/templates/one";

interface IProps {}

const ResumeTheme: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);

  React.useEffect(() => {
    window.localStorage.setItem("resume-data", JSON.stringify(globalData));
  });

  const generatePDF = () => {
    window.print();
  };

  return (
    <>
      <CreateWrapper>
        <div className="themePage">
          <Button onClick={generatePDF}>Generate PDF</Button>
        </div>
      </CreateWrapper>
      <TemplateOne />
    </>
  );
};

export default ResumeTheme;
