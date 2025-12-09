import React from "react";
import { useTranslation } from "react-i18next";
//import laskelmat from "../images/ComparisonResults.pdf";
const laskelmat = require("../images/ComparisonResults.pdf");

const ComparisonResults = () => {
  const { t } = useTranslation(["example"]);
  return (
    <div>
      <h1>{t("example:comparisonresults")}</h1>
      <div>
        <iframe src={laskelmat} width="100%" height="700"></iframe>
      </div>
    </div>
  );
};
export default ComparisonResults;
