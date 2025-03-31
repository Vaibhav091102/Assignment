import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Add navigation

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  background: #f5f5f5;
  padding: 40px;
  border-radius: 10px;
  //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const Input = styled.input`
  width: 85%;
  padding: 12px;
  margin: 10px 0;
  border-color: rgba(40, 44, 56, 0.19);
  border-radius: 5px;
`;

const Button = styled.button`
  width: 90%;
  padding: 12px;
  margin: 30px 0;
  background-color: #1c2c54;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0;
`;

const LoginForm = () => {
  const navigate = useNavigate(); // Add navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);
      alert("Login Successful!");
      console.log("Token:", res.data.token);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials!");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h1>Welcome back!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && (
            <ErrorText>{errors.email.message as string}</ErrorText>
          )}

          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
          />
          {errors.password && (
            <ErrorText>{errors.password.message as string}</ErrorText>
          )}

          <Button type="submit">Login</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default LoginForm;
