import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import CreateWrapper from "../../components/createWrapper";
import dataContext, { IContact } from "../../components/dataContext";

interface IProps {}

const Contact: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data: globalData, setData: setGlobalData } =
    React.useContext(dataContext);

  const [contacts, setContacts] = React.useState<IContact>(globalData.contact);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContacts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setGlobalData((prev) => ({
      ...prev,
      contact: contacts,
    }));
    navigate("/create/theme");
  };

  return (
    <CreateWrapper>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormHelperText>Enter your Email</FormHelperText>
        <Input
          id="email"
          type="text"
          name="email"
          value={contacts.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="portfolio">Portfolio Website</FormLabel>
        <FormHelperText>Enter your Portfolio Website Link</FormHelperText>
        <Input
          id="portfolio"
          type="text"
          name="portfolio"
          value={contacts.portfolio}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <FormHelperText>Enter your Phone number</FormHelperText>
        <Input
          id="phone"
          type="text"
          name="phone"
          value={contacts.phone}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="github">Github</FormLabel>
        <FormHelperText>Enter your Github Profile link</FormHelperText>
        <Input
          id="github"
          type="text"
          name="github"
          value={contacts.github}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="linkedIn">LinkedIn</FormLabel>
        <FormHelperText>Enter your LinkedIn Profile Link</FormHelperText>
        <Input
          id="linkedIn"
          type="text"
          name="linkedIn"
          value={contacts.linkedIn}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="bitBucket">BitBucket</FormLabel>
        <FormHelperText>Enter your BitBucket Profile link</FormHelperText>
        <Input
          id="bitBucket"
          type="text"
          name="bitBucket"
          value={contacts.bitBucket}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <FormHelperText>Enter your Address</FormHelperText>
        <Input
          id="address"
          type="text"
          name="address"
          value={contacts.address}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" onClick={handleSubmit}>
        Proceed Ahead
      </Button>
    </CreateWrapper>
  );
};

export default Contact;
