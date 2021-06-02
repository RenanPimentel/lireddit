import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, size, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input id={field.name} {...props} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
