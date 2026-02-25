import { useState } from "react";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// js-cookie
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        Cookies.set("token", response.data);
        navigate("/");
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
          Log In
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
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Flex justifyContent="space-between">
          <Button variant="link" colorScheme="teal" as={Link} to="/signup">
            Sign Up
          </Button>
          <Button
            variant="link"
            colorScheme="teal"
            as={Link}
            to="/reset-password"
          >
            Forgot Password
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
