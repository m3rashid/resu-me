import React from "react";
import dataContext from "../dataContext";

interface IProps {}

const TemplateOne: React.FC<IProps> = () => {
  const { data, setData } = React.useContext(dataContext);
  return (
    <>
      <div className="print-containter">{JSON.stringify(data, null, 4)}</div>
    </>
  );
};

export default TemplateOne;
