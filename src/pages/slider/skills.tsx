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
import useArray from "../../hooks/useArray";

interface ISingleSkill {
  skill: ISkill;
  handleRemoveSkill: (index: number) => void;
}
const SingleSkill: React.FC<ISingleSkill> = ({ skill, handleRemoveSkill }) => {
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
      <Button onClick={() => handleRemoveSkill(skill.index)}>Remove</Button>
    </Flex>
  );
};

interface IProps {}

const Skills: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const [oneSkill, setOneSkill] = React.useState("");
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);

  const {
    array: skillsArr,
    push,
    remove,
  } = useArray<ISkill>(globalData.skills);

  const handleAddSkill = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    push({ index: Math.random(), name: oneSkill });
    setOneSkill("");
  };

  const handleRemoveSkill = (index: number) => {
    const i = skillsArr.findIndex((item) => item.index === index);
    remove(i);
  };

  const handleSubmitAndPageChange = () => {
    setGlobalData((prev) => ({
      ...prev,
      skills: [...prev.skills, ...skillsArr],
    }));
    navigate("/create/interests");
  };

  const errors = {
    skill: oneSkill.length < 3,
  };

  return (
    <CreateWrapper>
      {skillsArr.length > 0 &&
        skillsArr.map((s) => (
          <SingleSkill
            key={s.index}
            skill={s}
            handleRemoveSkill={handleRemoveSkill}
          />
        ))}
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
        disabled={
          skillsArr.length > 0
            ? false
            : globalData.skills.length > 0
            ? false
            : true
        }
        type="submit"
        onClick={handleSubmitAndPageChange}
      >
        Proceed Ahead
      </Button>
    </CreateWrapper>
  );
};

export default Skills;
