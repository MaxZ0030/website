"use client";
import { useState } from "react";
import '../globals.css';          

export default function ProjectsPage() {
  
  const [projects] = useState([
    {
      id: 1,
      title: "Project 1",
      description: "Description for Project 1",
      image: "/assets/project1.jpg",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description for Project 2",
      video: "/assets/project2.mp4",
    },
    {
      id: 3,
      title: "Project 3",
      description: "Description for Project 3",
      image: "/assets/project3.png",
    },
    {
      id: 4,
      title: "Project 4",
      description: "Description for Project 3",
      image: "/assets/project3.png",
    },
    {
      id: 5,
      title: "Project 5",
      description: "Description for Project 3",
      image: "/assets/project3.png",
    },
    {
      id: 6,
      title: "Project 6",
      description: "Description for Project 3",
      image: "/assets/project3.png",
    },
    
  ]);

  return (
    <div className="projects-page-container">
      
      <div className="projects-scroll-pane">
        {projects.map((proj) => (
          <div key={proj.id} className="project-card">
            
            {proj.image && (
              <img
                src={proj.image}
                alt={proj.title}
                className="project-media"
              />
            )}
            
            {proj.video && (
              <video
                src={proj.video}
                className="project-media"
                controls
              />
            )}
            <h2>{proj.title}</h2>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
