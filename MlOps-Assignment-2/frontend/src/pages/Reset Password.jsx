import { useState } from "react";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const handleSendEmail = () => {
    // send email and password to the server
    console.log("Log in");

    fetch("http://localhost:3000/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    // if successful change the state
    setOpen(true);
  };

  const handleChangePassword = () => {
    // send email and password to the
    console.log("Change password");

    fetch("http://localhost:3000/change-password", {
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
          Log In
        </Heading>
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          mb={3}
          onChange={(e) => setEmail(e.target.value)}
        />
        {open && (
          <Input
            placeholder="**********"
            type="password"
            mb={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <Button
          variant={"solid"}
          colorPalette={"cyan"}
          mb={8}
          onClick={open ? handleChangePassword : handleSendEmail}
        >
          {open ? "Change Password" : "Send Email"}
        </Button>

        <Flex justifyContent="space-between">
          <Button variant="link" colorScheme="teal" as={Link} to="/signup">
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
