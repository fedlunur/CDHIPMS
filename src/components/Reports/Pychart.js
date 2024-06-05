
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import DataService from '../DataServices';
import { chartColors } from './ColorsUtil';

import { Button } from 'primereact/button';
        
import { Dropdown } from 'primereact/dropdown';
import { colors } from '@mui/material';
import { constrainPoint } from '@fullcalendar/core/internal';

export default function PieChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const documentStyle = getComputedStyle(document.documentElement);
    const [uniqueActivities, setUniqueActivities] = useState([]);

    const { allprojects, allactivities, alltasks } = DataService();

    // Create an array to hold the colors
    const backgroundColors = chartColors.map(variable => documentStyle.getPropertyValue(variable).trim());

    const handleChange = (event) => {
        setSelectedProject(event.value);
    };

    const searchbyproject = () => {
        if (selectedProject) {
            console.log("Selected Project====> ",selectedProject)
            const filteredActivities = allactivities.filter(activity => activity.project_name === selectedProject);
            console.log("££££££----- >  Filtered Activities ",filteredActivities)
            const tasksPerActivity = filteredActivities.map(activity => {
                const count = alltasks.filter(task => task.activity === activity.id).length;
                return count;
            });

            const data = {
                labels: filteredActivities.map(activity => activity.list_title),
                datasets: [
                    {
                        data: tasksPerActivity,
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: backgroundColors,
                    }
                ]
            };

            setUniqueActivities(filteredActivities);
            setChartData(data);
            console.log("££££££----- >  Updated chart with  ",data)
        }
    };

    useEffect(() => {
        if (allprojects.length > 0) {
            const formattedProjects = allprojects.map(project => ({
                label: project.project_name,
                value: project.id
            }));
            setProjectsList(formattedProjects);
        }

        if (allactivities.length > 0 && alltasks.length > 0 && !selectedProject) {
            const activitiesUnique = allactivities.filter((activity, index, self) =>
                self.findIndex(a => a.list_title.toLowerCase() === activity.list_title.toLowerCase()) === index
            );
            const tasksPerActivity = activitiesUnique.map(activity => {
                const count = alltasks.filter(task => task.activity === activity.id).length;
                return count;
            });

            const data = {
                labels: activitiesUnique.map(activity => activity.list_title),
                datasets: [
                    {
                        data: tasksPerActivity,
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: backgroundColors,
                    }
                ]
            };

            setUniqueActivities(activitiesUnique);
            setChartData(data);
        }
    }, [allprojects, allactivities, alltasks, selectedProject]);

    return (
        <div className="card flex justify-content-center">
            <Button icon="pi pi-search" onClick={searchbyproject} aria-label="Search" />
            <div className="field">
                <label htmlFor="task_card">Select Project</label>
                <Dropdown
                    id="task_card"
                    value={selectedProject}
                    options={projectsList}
                    onChange={handleChange}
                    filter
                    showClear={true}
                    placeholder="Select Task Card"
                />
            </div>
            <hr />
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    );
}