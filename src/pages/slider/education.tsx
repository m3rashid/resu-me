import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import CreateWrapper from "../../components/createWrapper";
import dataContext, {
  IEducation,
  IResumeData,
} from "../../components/dataContext";

interface ISingleEdu {
  education: IEducation;
}
const SingleEducation: React.FC<ISingleEdu> = ({ education }) => {
  return (
    <Flex
      key={education.index}
      border="1px"
      borderColor={"orange.400"}
      padding="10px"
      direction="column"
      rounded="md"
    >
      <Heading as="h3" size="md">
        {education.name}
      </Heading>
      <Flex justifyContent="space-between">
        <Box>
          <Text>Started in {education.startYear}</Text>
          <Text>Completed in {education.endYear}</Text>
        </Box>
        <Box>
          {education.grade && <Text>Secured {education.grade} grade</Text>}
          {education.percentage && <Text>Secured {education.percentage}%</Text>}
        </Box>
      </Flex>
    </Flex>
  );
};

interface IInputProps {
  setGlobalData: React.Dispatch<React.SetStateAction<IResumeData>>;
}

const NewInput: React.FC<IInputProps> = ({ setGlobalData }) => {
  const [data, setData] = React.useState({
    name: "",
    startYear: "",
    endYear: "",
    grade: "",
    percentage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setGlobalData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          ...data,
          index: Math.random() * 10,
        },
      ],
    }));
    setData({
      name: "",
      startYear: "",
      endYear: "",
      grade: "",
      percentage: "",
    });
  };

  const errors = {
    name: data.name.length < 3,
    startYear:
      isNaN(parseInt(data.startYear)) ||
      parseInt(data.startYear) < 1900 ||
      parseInt(data.startYear) > 2100,
    endYear:
      isNaN(parseInt(data.endYear)) ||
      parseInt(data.endYear) < parseInt(data.startYear) ||
      parseInt(data.endYear) < 1900 ||
      parseInt(data.endYear) > 2100,
    percentage:
      isNaN(parseInt(data.percentage)) ||
      parseInt(data.percentage) < 0 ||
      parseInt(data.percentage) > 100,
  };

  return (
    <>
      <FormControl isRequired isInvalid={data.name !== ""}>
        <FormLabel htmlFor="name">Name of Institution</FormLabel>
        <FormHelperText>Enter Name of Institution</FormHelperText>
        <Input
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          type="text"
        />
        {errors.name && <FormErrorMessage>Name is too short</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired isInvalid={data.startYear !== ""}>
        <FormLabel htmlFor="startYear">Start Year</FormLabel>
        <FormHelperText>Enter Start Year of the Institution</FormHelperText>
        <Input
          type="text"
          id="startYear"
          name="startYear"
          value={data.startYear}
          onChange={handleChange}
        />
        {errors.startYear && (
          <FormErrorMessage>Invalid Start Year</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={data.endYear !== ""}>
        <FormLabel htmlFor="endYear">End Year</FormLabel>
        <FormHelperText>
          Enter end/exprected end Year of the Institution
        </FormHelperText>
        <Input
          type="text"
          id="endYear"
          name="endYear"
          value={data.endYear}
          onChange={handleChange}
        />
        {errors.endYear && (
          <FormErrorMessage>Invalid End Year</FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="grade">Grade</FormLabel>
        <FormHelperText>Enter Final Grade</FormHelperText>
        <Input
          type="text"
          id="grade"
          name="grade"
          value={data.grade}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isInvalid={data.percentage !== ""}>
        <FormLabel htmlFor="percentage">Percentage</FormLabel>
        <FormHelperText>Enter Final Percentage</FormHelperText>
        <Input
          type="text"
          id="percentage"
          name="percentage"
          value={data.percentage}
          onChange={handleChange}
        />
        {errors.percentage && (
          <FormErrorMessage>Invalid Percentage</FormErrorMessage>
        )}
      </FormControl>
      <Button
        disabled={errors.name || errors.startYear || errors.endYear}
        type="submit"
        onClick={handleSubmit}
      >
        Add Education
      </Button>
    </>
  );
};

interface IProps {}

const Education: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);

  const removeEducation = (index: number) => {
    // @ts-ignore serious bug
    const newEducation = education.reduce((acc, curr) => {
      if (index !== curr.index) return [...acc, curr];
    }, [] as IEducation[]);
    console.log(newEducation);
  };

  const handleSubmit = () => {
    navigate("/create/experience");
  };

  return (
    <CreateWrapper>
      {globalData.education.map((edu) => {
        return (
          // <div key={edu.index} onClick={() => removeEducation(edu.index)}>
          //   <p>Name: {edu.name}</p>
          //   <p>Start Year: {edu.startYear}</p>
          //   <p>End Year: {edu.endYear}</p>
          //   <p>Grade: {edu.grade}</p>
          //   <p>Percentage: {edu.percentage}</p>
          // </div>
          <SingleEducation key={edu.index} education={edu} />
        );
      })}
      <NewInput setGlobalData={setGlobalData} />
      <Button
        disabled={globalData.education.length === 0}
        type="submit"
        onClick={handleSubmit}
      >
        Proceed Ahead
      </Button>
    </CreateWrapper>
  );
};

export default Education;
