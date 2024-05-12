import React from "react";
import Layout from "../../views/Layout";
import { useHistory } from "react-router-dom";
import useAxios from "../../utils/useAxios";

import Mytimetable from "./MyTimetable";
function TimetableIndex() {
  return (
    <Layout>
      <div>
        <div className="content-wrapper">
          <section className="content">
            <h1>Projects List</h1>
            <div className="container-fluid"></div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default TimetableIndex;
