import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import Layout from "../views/Layout";

import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import DatatableProjects from "./DatatableProjects";
import DataService from "./DataServices"; 

export default function ProjectsDashboard() {
  const api = useAxios();
  const [taskmembers, setTaskmembers] = useState([]);
  const [incomingprojects, setIncomingprojects] = useState([]);
  const [incomingactivities, setIncomingactivities] = useState([]);
  const [incomingTeammebers, setIncomingTeammebers] = useState([]);
  const [incomingusers, setIncomingUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [user, setUsers] = useState([]);


  const location = useLocation();
  const { allprojects,allactivities,alltasks,alluserss,alltaskmembers,allteammembers, loading, error, activities_by_project, tasksbyproject } = DataService(); // Assuming useCrud fetches data

  return (
    <Layout>
      <div>
        <div className="content-wrapper">
          {/* Main content */}
          <section className="content">
            <h1>Projects List</h1>
            <div className="container-fluid">
              {/* Small boxes (Stat box) */}
              <div className="row">
                {allprojects.map((Project,index) => (
                  <ProjectCard
                     key={Project.id}
                    project={Project}
                    index={index}
                    users={alluserss}
                    teammebers={allteammembers}
                    activities={allactivities}
                  />
                ))}
              </div>
       
       
          <DatatableProjects
            projects={allprojects}
            teammembers={allteammembers}
            users={alluserss}
            activities={allactivities}
            tasks={alltasks}
          />
               </div>
             </section>
          {/* 
/* new data table      */}
        </div>
      </div>
   
    </Layout>

  );
}
