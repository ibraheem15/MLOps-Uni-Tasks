import { Heading } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Heading>Welcome to the app</Heading>
    </div>
  );
}

export default App;
