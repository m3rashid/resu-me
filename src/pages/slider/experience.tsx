import React from "react";
import {
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

import CreateWrapper from "../../components/createWrapper";
import dataContext, {
  IExperience,
  IResumeData,
} from "../../components/dataContext";
import { useNavigate } from "react-router-dom";

interface ISingleExp {
  experience: IExperience;
}

const SingleExperience: React.FC<ISingleExp> = ({ experience }) => {
  return (
    <Flex
      key={experience.index}
      border="1px"
      borderColor={"orange.400"}
      padding="10px"
      direction="column"
      rounded="md"
    >
      <Heading as="h3" size="md">
        {experience.name}
      </Heading>
      <Text>Started in {experience.startYear}</Text>
      <Text>Completed in {experience.endYear}</Text>
      {experience.role && <Text>As a {experience.role}</Text>}
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
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setGlobalData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...data, index: Math.random() * 10 }],
    }));
    setData({ name: "", startYear: "", endYear: "", role: "" });
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
    role: data.role.length < 3,
  };

  return (
    <>
      <FormControl isRequired isInvalid={data.name !== ""}>
        <FormLabel htmlFor="name">Name of Institution</FormLabel>
        <FormHelperText>Enter Name of the Company</FormHelperText>
        <Input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        {errors.name && <FormErrorMessage>Name is too short</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired isInvalid={data.startYear !== ""}>
        <FormLabel htmlFor="startYear">Joined</FormLabel>
        <FormHelperText>Enter Joining month/year the Company</FormHelperText>
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
        <FormLabel htmlFor="endYear">Left</FormLabel>
        <FormHelperText>Enter leaving month/year the Company</FormHelperText>
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
      <FormControl isRequired isInvalid={data.role !== ""}>
        <FormLabel htmlFor="role">Role</FormLabel>
        <FormHelperText>Enter your role in the Company</FormHelperText>
        <Input
          type="text"
          id="role"
          name="role"
          value={data.role}
          onChange={handleChange}
        />
        {errors.role && <FormErrorMessage>Invalid role</FormErrorMessage>}
      </FormControl>
      <Button
        disabled={
          errors.name || errors.startYear || errors.endYear || errors.role
        }
        type="submit"
        onClick={handleSubmit}
      >
        Add Experience
      </Button>
    </>
  );
};

interface IProps {}

const Experience: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);

  const handleSubmit = () => {
    navigate("/create/skills");
  };

  return (
    <CreateWrapper>
      {globalData.experience.map((exp) => {
        return <SingleExperience key={exp.index} experience={exp} />;
      })}
      <NewInput setGlobalData={setGlobalData} />
      <Button
        disabled={globalData.experience.length === 0}
        type="submit"
        onClick={handleSubmit}
      >
        Proceed Ahead
      </Button>
    </CreateWrapper>
  );
};

export default Experience;
