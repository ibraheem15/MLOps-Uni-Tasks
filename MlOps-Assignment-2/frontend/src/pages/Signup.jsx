import React, { useEffect, useState } from "react";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
// react router dom
import { Link,useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    // send email and password to the
    console.log("Sign up");

    fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    // if successful, redirect to the login page
    navigate("/login");
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        p={12}
        borderRadius={8}
        boxShadow="lg"
        alignItems="center"
      >
        <Heading mb={6} textAlign="center">
          Sign Up
        </Heading>
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          mb={3}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="**********"
          type="password"
          mb={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant={"solid"}
          colorPalette={"cyan"}
          mb={8}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
        <Flex justifyContent="space-between">
          <Button variant="link" colorScheme="teal" as={Link} to="/login">
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
