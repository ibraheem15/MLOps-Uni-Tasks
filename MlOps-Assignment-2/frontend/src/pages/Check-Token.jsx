import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";

const CheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // check if the token is valid
    axios
      .get("http://localhost:3000/check-token", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Check Token Page</h1>
      <Button
        onClick={() => {
          Cookies.remove("token");
          navigate("/login");
        }}
        variant="solid"
        colorPalette={"red"}
      >
        Log out
      </Button>
    </div>
  );
};

export default CheckToken;
