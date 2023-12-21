import axios from "axios";
import { StarRating } from "@/components/import";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import FTLibraryBlock from "../components/ft_pages/FTLibraryBlock";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const FTCourseLibrary = (props) => {
  const { pageData = null } = props;

  let catList = pageData.map((Itm) => Itm.category);
  catList = [...new Set(catList)];


  return pageData ? <FTLibraryBlock catList={catList} pageData={pageData} /> : <>Loading...</>;
};

export async function getServerSideProps() {
  const ftPageResp = await axios.post(`${baseUrl}/courses/ft`);

  if (!ftPageResp.data || !ftPageResp.data.data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pageData: ftPageResp.data.data,
    },
  };
}

export default FTCourseLibrary;
