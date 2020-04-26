import React from "react";
import styled from "styled-components";

const noPage = () => {
  const H1 = styled.h1`
    color: #ffffff;
    text-align: center;
    margin-bottom: 30px;
  `;

  return <H1>404 Page Not Found</H1>;
};

export default noPage;
