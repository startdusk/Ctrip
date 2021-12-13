import { Form, Input, Button, Checkbox } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "../../redux/hooks";
import { signIn } from "../../redux/user/slice";

import styles from "./SignInForm.module.css";

export const SignInForm: React.FC = () => {
  const loading = useSelector((state) => state.user.loading);
  // const error = useSelector((state) => state.user.error);
  const jwt = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [jwt]);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    dispatch(
      signIn({
        email: values.username,
        password: values.password,
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
