import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import CreateWrapper from "../../components/createWrapper";
import dataContext, { ISkill } from "../../components/dataContext";
import { SingleSkill } from "./skills";

interface IProps {}

const Interests: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);
  const [oneInterest, setOneInterest] = React.useState("");

  const handleAddInterest = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setGlobalData((prev) => ({
      ...prev,
      interests: [
        ...prev.interests,
        {
          index: Math.random(),
          name: oneInterest,
        },
      ],
    }));
    setOneInterest("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOneInterest(e.target.value);
  };

  const handleSubmitAndPageChange = () => {
    navigate("/create/contact");
  };

  const errors = {
    oneInterest: oneInterest.length < 3,
  };

  return (
    <CreateWrapper>
      {globalData.interests.map((s) => (
        <SingleSkill key={s.index} skill={s as ISkill} />
      ))}
      <FormControl isRequired isInvalid>
        <FormLabel htmlFor="oneInterest">Enter a Interest</FormLabel>
        <FormHelperText>Enter any skill or hobby</FormHelperText>
        <Input
          id="oneInterest"
          type="text"
          name="oneInterest"
          value={oneInterest}
          onChange={handleChange}
        />
        {errors.oneInterest && (
          <FormErrorMessage>Skill too short</FormErrorMessage>
        )}
      </FormControl>
      <Button
        disabled={oneInterest.length < 3}
        type="submit"
        onClick={handleAddInterest}
      >
        Add Interest
      </Button>
      <Button
        disabled={globalData.interests.length === 0}
        type="submit"
        onClick={handleSubmitAndPageChange}
      >
        Proceed Ahead
      </Button>
    </CreateWrapper>
  );
};

export default Interests;
