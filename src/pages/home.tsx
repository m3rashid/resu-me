import React from "react";

import HomeDetails from "../components/main/details";
import LandingMain from "../components/main/hero";

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <>
      <LandingMain />
      <HomeDetails />
    </>
  );
};

export default Home;
