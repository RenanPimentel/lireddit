import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

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

export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
