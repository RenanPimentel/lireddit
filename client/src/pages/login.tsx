import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await login({ options: values });

          if (data?.login.errors) {
            data?.login.errors.forEach(err =>
              setErrors({ [err.field]: err.message })
            );
          } else if (data?.login.user) {
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
