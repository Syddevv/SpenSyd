import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (req, res) => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  return <div>Register</div>;
};

export default SignUp;
