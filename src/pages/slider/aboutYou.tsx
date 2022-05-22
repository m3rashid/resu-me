import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import CreateWrapper from "../../components/createWrapper";
import dataContext from "../../components/dataContext";

interface IProps {}

const AboutYou: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);
  const [data, setData] = React.useState(globalData.about);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setGlobalData((prev) => ({
      ...prev,
      about: { name: data.name, jobTitle: data.jobTitle, bio: data.bio },
    }));
    navigate("/create/education");
  };

  const errors = {
    name: data.name.length < 3,
    jobTitle: data.jobTitle.length < 3,
    bio: data.bio.length < 3,
  };

  return (
    <CreateWrapper>
      <FormControl isRequired isInvalid={data.name !== ""}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormHelperText>Enter your Name</FormHelperText>
        <Input
          id="name"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        {errors.name && <FormErrorMessage>Name is too short</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired isInvalid={data.jobTitle !== ""}>
        <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
        <FormHelperText>Enter your Job Title</FormHelperText>
        <Input
          id="jobTitle"
          type="text"
          name="jobTitle"
          value={data.jobTitle}
          onChange={handleChange}
        />
        {errors.jobTitle && (
          <FormErrorMessage>jobTitle is too short</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={data.bio !== ""}>
        <FormLabel htmlFor="bio">Bio</FormLabel>
        <FormHelperText>Enter your Bio</FormHelperText>
        <Input
          id="bio"
          type="text"
          name="bio"
          value={data.bio}
          onChange={handleChange}
        />
        {errors.bio && <FormErrorMessage>Bio is too short</FormErrorMessage>}
      </FormControl>
      <Button
        disabled={errors.name || errors.bio || errors.jobTitle}
        type="submit"
        onClick={handleSubmit}
      >
        Proceed Ahead
      </Button>
    </CreateWrapper>
  );
};

export default AboutYou;
