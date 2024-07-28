import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
import { AiFillDashboard, AiFillProject } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { GrProjects, GrTasks } from "react-icons/gr";
import temp from "./tem.jpg";
import temp1 from "./tem2.png";
import DrillDown from "./DrillDown.jsx";

export default function Menu() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const nav_links = [
    { to: "/dashboard", icon: <AiFillDashboard />, text: "Dashboard" },
    { to: "/projectsDashboard", icon: <AiFillProject />, text: "Projects" },
    {
      to: "/calendar",
      icon: <i className="nav-icon far fa-calendar-alt" />,
      text: "Events",
    },
    { to: "/taskdt", icon: <GrTasks />, text: "Tasks" },
    { to: "/membersandchat", icon: <RiTeamFill />, text: "Members" },
    { to: "/attachments", icon: <ImAttachment />, text: "Attachments" },
    { to: "/projectdetails", icon: <GrProjects />, text: "Project Details" },
  ];
  return (
    <div>
      {/* <aside className="main-sidebar sidebar-dark-primary elevation-4"> */}
      {/* Brand Logo */}
      {/* <a href="index3.html" className="brand-link">
    <img
      src={temp}
      alt="ProjectManagement Logo"
      className="brand-image img-circle elevation-3 mt-2"
      style={{ opacity: ".8" }}
    />
    <Link to="/dashboard" className="nav-link" style={{ color: 'white' }}>
      <span className="brand-text font-weight-light">Project Management</span>
    </Link>
  </a> */}
      {/* Sidebar */}
      {/* <div className="sidebar"> */}
      {/* Sidebar user panel (optional) */}
      {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img
          src={temp1}
          className="img-circle elevation-2"
          alt="User Image"
        />
      </div>
      <div className="info">
        <a href="#" className="d-block">
          {user ? user.username : 'Guest'}
        </a>
      </div>
    </div> */}
      {/* SidebarSearch Form */}

      {/* Sidebar Menu */}
      {/* <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
      {/* <li className="nav-item menu-open">
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Dashboard
              <i className="right fas fa-angle-left" />
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/projectsDashboard"
            className={`nav-link ${location.pathname === "/projectsDashboard" ? "active" : ""}`}
          >
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              Projects
              <i className="right fas fa-angle-left" />
            </p>
          </Link>
        </li>

        <li className="nav-header">Tasks</li>
        <li className="nav-item">
          <Link
            to="/calendar"
            className={`nav-link ${location.pathname === "/timetable" ? "active" : ""}`}
          >
            <i className="nav-icon far fa-calendar-alt" />
            <p>
              Events
              <i className="right fas fa-angle-left" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/taskdt"
            className={`nav-link ${location.pathname === "/taskdt" ? "active" : ""}`}
          >
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              Tasks
              <i className="right fas fa-calendar-alt" />
            </p>
          </Link>
        </li>
        <li className="nav-header">Teams</li>
        <li className="nav-item">
          <Link
            to="/membersandchat"
            className={`nav-link ${location.pathname === "/membersandchat" ? "active" : ""}`}
          >
            <i className="nav-icon far fa-person-alt" />
            <p>Members</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/attachments"
            className={`nav-link ${location.pathname === "/attachments" ? "active" : ""}`}
          >
            <i className="nav-icon far fa-person-alt" />
            <p>Attachments</p>
          </Link>
        </li>
      </ul>
    </nav> */}
      {/* /.sidebar-menu */}
      {/* </div> */}
      {/* /.sidebar */}
      {/* </aside> */}
      <aside className="bg-white h-full main-sidebar px-2 py-2 w-1/6 overflow-y-auto">
        <h1 className="font-bold text-2xl mx-2 text-gray-900">
          Project Management
        </h1>
        <nav className="mx-2 mt-12 text-base flex flex-col h-full">
          <ul className="space-y-3">
            {nav_links.map(({ to, icon, text }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link flex gap-2 items-center px-3 py-2 rounded-md transition-colors duration-300 ${
                    location.pathname === to
                      ? "bg-blue-100 text-blue-600 border border-blue-500 font-bold"
                      : "hover:bg-blue-50 hover:text-blue-500"
                  }`}
                >
                  {icon}
                  <p>{text}</p>
                </Link>
              </li>
            ))}
          </ul>
          {/* <ul>
          <li className="flex gap-2 items-center">
            <FaUserAlt />
            <a href="#" className="nav-link">
              {user ? user.username : "Guest"}
            </a>
          </li>
        </ul> */}
        </nav>
      </aside>
    </div>
  );
}
