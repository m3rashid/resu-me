import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

import CreateWrapper from "../../components/createWrapper";
import dataContext from "../../components/dataContext";
import { useNavigate } from "react-router-dom";

interface IProps {}

const Skills: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);
  const [oneSkill, setOneSkill] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOneSkill(e.target.value);
  };

  const handleAddSkill = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setGlobalData((prev) => ({
      ...prev,
      skills: [...prev.skills, { index: Math.random(), name: oneSkill }],
    }));
    setOneSkill("");
  };

  const errors = {
    skill: oneSkill.length < 3,
  };

  const handleSubmitAndPageChange = () => {
    navigate("/create/interests");
  };

  const removeSkill = (index: number) => {};

  return (
    <CreateWrapper>
      {globalData.skills.map((s) => (
        <div key={s.index}>{s.name}</div>
      ))}
      <FormControl isRequired isInvalid>
        <FormLabel htmlFor="skill">Enter a Skill</FormLabel>
        <FormHelperText>Enter your skill</FormHelperText>
        <Input
          id="skill"
          type="text"
          name="skill"
          value={oneSkill}
          onChange={handleChange}
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
