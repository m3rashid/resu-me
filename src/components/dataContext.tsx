import React from "react";

export interface IContact {
  email: string;
  portfolio: string;
  phone: number | string;
  github: string;
  linkedIn: string;
  bitBucket: string;
  address: string;
}

export interface IEducation {
  index: number;
  name: string;
  startYear: string;
  endYear?: string;
  grade?: string;
  percentage?: number | string;
}

export interface IExperience {
  index: number;
  name: string;
  startYear: string;
  endYear?: string;
  role: string;
}

export interface IInterests {
  name: string;
  index: number;
}

export interface ISkill {
  name: string;
  index: number;
}

export interface IResumeData {
  template: {};
  about: {
    name: string;
    jobTitle: string;
    bio: string;
  };
  education: IEducation[];
  experience: IExperience[];
  skills: ISkill[];
  interests: IInterests[];
  contact: IContact;
  theme: {};
}

export const initialState: IResumeData = {
  template: {},
  about: {
    name: "",
    jobTitle: "",
    bio: "",
  },
  education: [],
  experience: [],
  skills: [],
  interests: [],
  contact: {
    address: "",
    bitBucket: "",
    email: "",
    github: "",
    linkedIn: "",
    phone: "",
    portfolio: "",
  },
  theme: {},
};

const dataContext = React.createContext<{
  data: IResumeData;
  setData: React.Dispatch<React.SetStateAction<IResumeData>>;
}>({
  data: initialState,
  setData: {} as React.Dispatch<React.SetStateAction<IResumeData>>,
});

export default dataContext;
