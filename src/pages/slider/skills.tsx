import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  FormErrorMessage,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import CreateWrapper from "../../components/createWrapper";
import dataContext, { ISkill } from "../../components/dataContext";

interface ISingleSkill {
  skill: ISkill;
}
export const SingleSkill: React.FC<ISingleSkill> = ({ skill }) => {
  return (
    <Flex
      key={skill.index}
      justifyContent="space-between"
      alignItems="center"
      border="1px"
      borderColor={"orange.400"}
      padding="10px"
      rounded="md"
    >
      <Box fontSize={22}>{skill.name}</Box>
    </Flex>
  );
};

interface IProps {}

const Skills: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const [oneSkill, setOneSkill] = React.useState("");
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);

  const handleAddSkill = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setGlobalData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          index: Math.random(),
          name: oneSkill,
        },
      ],
    }));
    setOneSkill("");
  };

  const handleSubmitAndPageChange = () => {
    navigate("/create/interests");
  };

  const errors = {
    skill: oneSkill.length < 3,
  };

  return (
    <CreateWrapper>
      {globalData.skills.length > 0 &&
        globalData.skills.map((s) => <SingleSkill key={s.index} skill={s} />)}
      <FormControl isRequired isInvalid>
        <FormLabel htmlFor="skill">Enter a Skill</FormLabel>
        <FormHelperText>Enter your skill</FormHelperText>
        <Input
          id="skill"
          type="text"
          name="skill"
          value={oneSkill}
          onChange={(e) => setOneSkill(e.target.value)}
        />
        {errors.skill && <FormErrorMessage>Skill too short</FormErrorMessage>}
      </FormControl>
      <Button disabled={oneSkill.length < 3} onClick={handleAddSkill}>
        Add Skill
      </Button>
      <Button
        disabled={globalData.skills.length === 0}
        type="submit"
        onClick={handleSubmitAndPageChange}
      >
        Proceed Ahead
      </Button>
    </CreateWrapper>
  );
};

export default Skills;
