import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await register(values);

          if (data?.register.errors) {
            data?.register.errors.forEach(err =>
              setErrors({ [err.field]: err.message })
            );
          } else if (data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ values, isSubmitting, handleChange }) => (
          <Form>
            <InputField
              value={values.username}
              onChange={handleChange}
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Box my="10px">
              <InputField
                value={values.password}
                onChange={handleChange}
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Box>
            <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
