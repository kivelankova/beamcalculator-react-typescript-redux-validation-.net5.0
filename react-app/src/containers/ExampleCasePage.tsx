import React from "react";
import { useTranslation } from "react-i18next";
// import example from "../images/ExampleCase.pdf";
const example = require("../images/ExampleCase.pdf");

const TestPage = () => {
  const { t } = useTranslation(["example"]);
  return (
    <div>
      <h1>{t("example:example")}</h1>
      <div>
        <iframe src={example} width="100%" height="700"></iframe>
      </div>
    </div>
  );
};
export default TestPage;
