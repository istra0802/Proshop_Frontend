import { Outlet } from "react-router-dom";
import Directory from "./Directory";

import mouse from "../../images/mousebg.jpg";
import camera from "../../images/camerabg.jpg";
import phone from "../../images/phonebg.jpg";
import laptop from "../../images/laptopbg.jpg";
import airpod from "../../images/airpodsbg.jpg";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t, i18n } = useTranslation("global");

  const categories = [
    {
      id: 1,
      title: t("category.laptops"),
      imageUrl: laptop,
    },
    {
      id: 2,
      title: t("category.mouse"),
      imageUrl: mouse,
    },
    {
      id: 3,
      title: t("category.airpods"),
      imageUrl: airpod,
    },
    {
      id: 4,
      title: t("category.mobilePhone"),
      imageUrl: phone,
    },
    {
      id: 5,
      title: t("category.camera"),
      imageUrl: camera,
    },
  ];

  return (
    <div className="mt-5">
      <h2> Categories </h2>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );
};

export default Categories;
