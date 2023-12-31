import React from "react";
import { Route, Redirect } from "react-router-dom";

interface AuthLayoutProps {
  component: any;
  layout: any;
  isAuthProtected: any;
  path?: string;
  exact?: boolean;
  key?: number;
}

const Authmiddleware = ({
  component,
  layout,
  isAuthProtected,
  path,
  exact,
  key,
  ...rest
}: AuthLayoutProps) => {
  const Layout = layout;
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props : any) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default Authmiddleware;
