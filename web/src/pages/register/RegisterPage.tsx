import React from "react";

import { UserLayout } from "../../layouts";

import { RegisterForm } from "./RegisterForm";
// import styles from "./Register.module.css";

interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <UserLayout pageTitle={"注册页面"}>
      <RegisterForm />
    </UserLayout>
  );
};
