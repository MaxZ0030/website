"use client";
import { useState } from "react";
import "../globals.css";

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: 7,
      title: "That Time I Got Reincarnated as a Gun and Had to Buy People to Protect My House (2025)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng, Ariz Taqvi, and Carlos Camacho for Pirate Jam 16 in Godot. A 3D Voxel art Tower Defense where the main character summmons human turrets to fight weapons. Theme: You are the weapon",
      image: "/assets/DrkpHg.png",
      link: "https://tauntyazagoos.itch.io/that-time-i-got-reincarnated-as-a-gun-and-had-to-buy-people-to-protect-my-house",
      linktext: "Click here to go play/download the game!",
    },
    {
      id: 6,
      title: "Bleep Bloop (2024)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng and Ariz Taqvi for Proc Game Jam 2024 in Godot. A procedurally generated music maker utilizing Conway's Game of Life.",
      video: "/assets/BleepBloop.mp4",
      link: "https://tauntybird.itch.io/bleep-bloop",
      linktext: "Click here to go download the app!",
    },
    {
      id: 5,
      title: "Look Sharp, Major! (2024)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng and Ariz Taqvi for GMTK Game Jam 2024. A bullet hell inspired by Vampire Survivors to the tune of 'In the Hall of the Mountain King' by Edvard Grieg. Theme: Built to scale",
      image: "/assets/LSMajor.png",
      link: "https://tauntyazagoos.itch.io/look-sharp-major",
      linktext: "Click here to go play/download the game!",
    },
    {
      id: 4,
      title: "Dew (2024)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng and Ariz Taqvi for Pixel Game Jam 2024. A puzzle platformer where you can utilize form transformations to solve puzzles. Theme: Aqua",
      image: "/assets/DewBanner.png",
      link: "https://tauntyazagoos.itch.io/dew",
      linktext: "Click here to go play/download the game!",
    },
    
    {
      id: 3,
      title: "Digi Physica (2022)",
      description:
        "Created by Max Zhou, Amy Chang, Julian Wang, Kellan Cervany, and Kristen Erlon at UT Austin for our senior design project. A combination of hardware sensors and digital image processing were used to create an arm sleeve to facilitate remote physical therapy.",
      video: "/assets/DigiPhysi.mp4",
    //   link: "https://www.youtube.com/watch?v=x2KPqDh41fM&feature=youtu.be",
    //   linktext: "Click here to go play/download the game!",
    },
    {
      id: 2,
      title: "DASH (2017)",
      description:
        "Game code, graphics, music, and design belong to Max Zhou, Meggie Cheng, and Ariz Taqvi. Created in Gamemaker Studio. Won 10th place at FBLA Nationals Computer Game & Simulation Programming competition.",
      video: "/assets/DASHDemo.mp4",
    },
    {
      id: 1,
      title: "Sweet Dreams (2016)",
      description:
        "Game code, graphics, music, and design belong to Max Zhou, Meggie Cheng, and Ariz Taqvi. Created in Gamemaker Studio.",
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
              className="custom-link"
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
