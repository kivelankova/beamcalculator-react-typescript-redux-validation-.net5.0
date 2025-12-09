import React, { useEffect, FC, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInput } from "../redux/actions/inputActions";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Navbar: FC = () => {
  const { i18n, t } = useTranslation(["navbar"]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (localStorage.getItem("i18nextLng")?.length > 2) {
  //     i18next.changeLanguage("en");
  //   }
  // }, []);

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    console.log(e.target.value);
    dispatch(
      addInput({
        language: e.target.value,
      })
    );
  };

  return (
    <div>
      <header className="header">
        <div className="mid">
          <ul className="navbar">
            <li>{t("title")}</li>
            <li>
              <Link to="/">{t("navbar:input")}</Link>
            </li>
            <li>
              <Link to="/result">{t("navbar:result")}</Link>
            </li>
            <li>
              <Link to="/test">{t("navbar:example")}</Link>
            </li>
            <li>
              <Link to="/comparisonresults">
                {t("navbar:comparisonResults")}
              </Link>
            </li>
            <li>
              <select
                // value={localStorage.getItem("i18nextLng")}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="fi">Suomi</option>
              </select>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};
export default Navbar;
