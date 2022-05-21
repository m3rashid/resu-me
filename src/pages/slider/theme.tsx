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

  return (
    <CreateWrapper>
      <pre>{JSON.stringify(globalData, null, 4)}</pre>
      <TemplateOne />
    </CreateWrapper>
  );
};

export default ResumeTheme;
