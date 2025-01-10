"use client";
import { useState } from "react";
import "../globals.css";

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: 6,
      title: "Bleep Bloop (2024)",
      description:
        "Created in Godot with Meggie Cheng and Ariz Taqvi for Proc Game Jam 2024 in Godot. A procedurally generated music maker.",
      video: "/assets/BleepBloop.mp4",
      link: "https://tauntyazagoos.itch.io/dew",
      linktext: "Click here to go download the app!",
    },
    {
      id: 5,
      title: "Look Sharp, Major! (2024)",
      description:
        "Created in Godot with Meggie Cheng and Ariz Taqvi for GMTK Game Jam 2024. Bullet hell inspired by Vampire Survivors.",
      image: "/assets/LSMajor.png",
      link: "https://tauntyazagoos.itch.io/look-sharp-major",
      linktext: "Click here to go play/download the game!",
    },
    {
      id: 4,
      title: "Dew (2024)",
      description:
        "Created in Godot with Meggie Cheng and Ariz Taqvi for Pixel Game Jam 2024. Dew is a puzzle platformer where you can utilize form transformations to solve puzzles.",
      image: "/assets/DewBanner.png",
      link: "https://tauntyazagoos.itch.io/dew",
      linktext: "Click here to go play/download the game!",
    },
    
    {
      id: 3,
      title: "Digi Physica (2022)",
      description:
        "Created by Max Zhou, Amy Chang, Julian Wang, Kellan Cervany, and Kristen Erlon for Senior Design Project. A combination of hardware sensors and visual image processing to create a tool to facilitate remote physical therapy.",
      video: "/assets/DigiPhysi.mp4",
    //   link: "https://www.youtube.com/watch?v=x2KPqDh41fM&feature=youtu.be",
    //   linktext: "Click here to go play/download the game!",
    },
    {
      id: 2,
      title: "DASH (2017)",
      description:
        "Game code, graphics, music, and design belong to me, Meggie Cheng, and Ariz Taqvi. Created in Gamemaker Studio. Won 10th place at FBLA Nationals Computer Game & Simulation Programming competition.",
      video: "/assets/DASHDemo.mp4",
    },
    {
      id: 1,
      title: "Sweet Dreams (2016)",
      description:
        "Game code, graphics, music, and design belong to me, Meggie Cheng, and Ariz Taqvi. Created in Gamemaker Studio.",
      video: "/assets/SweetDreamsDemo.mp4",
    },
  ]);

  return (
    <>
      
      <div></div>

      {projects.map((proj) => (
        <div key={proj.id} className="project-card">
        <h2>{proj.title}</h2>

        
        {proj.youtube && (
          <div className="project-media" style={{ aspectRatio: '16/9' }}>
            <iframe
              width="560"
              height="315"
              src={proj.youtube}
              title={proj.title}
              
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        
        {!proj.youtube && proj.video && (
          <video src={proj.video} className="project-media" controls />
        )}

        
        {!proj.youtube && !proj.video && proj.image && (
          <img src={proj.image} alt={proj.title} className="project-media" />
        )}

        <p>{proj.description}</p>

        
        {proj.link && proj.linktext && (
          <p>
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#40a0ff", textDecoration: "underline" }}
            >
              {proj.linktext}
            </a>
          </p>
        )}
      </div>
      ))}
    </>
  );
}
