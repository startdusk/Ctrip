import React from "react";

import { UserLayout } from "../../layouts";

import { SignInForm } from "./SignInForm";
// import styles from "./SignInPage.module.css";

interface SignInPageProps {}

export const SignInPage: React.FC<SignInPageProps> = () => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
};
