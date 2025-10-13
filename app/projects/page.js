"use client";
import { useState } from "react";
import "../globals.css";

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: 10,
      title:
        "Wizard of Weather",
      description:
        "Created in Unity by Max Zhou, Alvin Li, Cheryl Wang, Eyana Yan, and Gamma Zheng for the Building Virtual Worlds course. A 3D Virtual Reality (VR) game with a focus of guiding players through indirect control. Theme: Control the weather.",
      video: "/assets/WizardofWeather.mp4",
      link: "https://tauntyazagoos.itch.io/that-time-i-got-reincarnated-as-a-gun-and-had-to-buy-people-to-protect-my-house",
      linktext: "",
      category: "School Projects",
    },
    {
      id: 9,
      title:
        "Horsepital",
      description:
        "Created in Unity by Max Zhou, Chufan Chen, Mingrui Xu, Agnes Zhang, and Ailun Zhou for the Building Virtual Worlds course. A 3D game with a focus on creating an intuitive interface for players. Theme: Shoeing a horse.",
      video: "/assets/Horsepital.mp4",
      link: "https://tauntyazagoos.itch.io/that-time-i-got-reincarnated-as-a-gun-and-had-to-buy-people-to-protect-my-house",
      linktext: "",
      category: "School Projects",
    },
    {
      id: 8,
      title:
        "Cosmic Fruit Loops",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng, Ariz Taqvi, and CJ Kim for GMTK 2025. Rated in the top 3% out of 9500 entries for popularity. A 2D Puzzle game where the goal is to surround fruit with a snake's body in unique ways. Theme: Loop.",
      image: "/assets/CosmicLoopsBanner.png",
      link: "https://tauntyazagoos.itch.io/cosmic-fruit-loops",
      linktext: "Click here to go play/download the game!",
      category: "Game Jams",
    },
    {
      id: 7,
      title:
        "That Time I Got Reincarnated as a Gun and Had to Buy People to Protect My House (2025)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng, Ariz Taqvi, and Carlos Camacho for Pirate Jam 16. A 3D Voxel Art Tower Defense where the main character summmons human turrets to fight weapons. Theme: You are the weapon",
      image: "/assets/DrkpHg.png",
      link: "https://tauntyazagoos.itch.io/that-time-i-got-reincarnated-as-a-gun-and-had-to-buy-people-to-protect-my-house",
      linktext: "Click here to go play/download the game!",
      category: "Game Jams",
    },
    {
      id: 6,
      title: "Bleep Bloop (2024)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng and Ariz Taqvi for Proc Game Jam 2024. A procedurally generated music maker utilizing Conway's Game of Life.",
      video: "/assets/BleepBloop.mp4",
      link: "https://tauntybird.itch.io/bleep-bloop",
      linktext: "Click here to go download the app!",
      category: "Game Jams",
    },
    {
      id: 5,
      title: "Look Sharp, Major! (2024)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng and Ariz Taqvi for GMTK Game Jam 2024. A bullet hell inspired by Vampire Survivors to the tune of 'In the Hall of the Mountain King' by Edvard Grieg. Theme: Built to scale",
      image: "/assets/LSMajor.png",
      link: "https://tauntyazagoos.itch.io/look-sharp-major",
      linktext: "Click here to go play/download the game!",
      category: "Game Jams",
    },
    {
      id: 4,
      title: "Dew (2024)",
      description:
        "Created in Godot by Max Zhou, Meggie Cheng and Ariz Taqvi for Pixel Game Jam 2024. A puzzle platformer where you can utilize form transformations to solve puzzles. Theme: Aqua",
      image: "/assets/DewBanner.png",
      link: "https://tauntyazagoos.itch.io/dew",
      linktext: "Click here to go play/download the game!",
      category: "Game Jams",
    },
    {
      id: 3,
      title: "Digi Physica (2022)",
      description:
        "Created by Max Zhou, Amy Chang, Julian Wang, Kellan Cervany, and Kristen Erlon at UT Austin for our senior design project. A combination of hardware sensors and digital image processing were used to create an arm sleeve to facilitate remote physical therapy.",
      video: "/assets/DigiPhysi.mp4",
      category: "School Projects",
    },
    {
      id: 2,
      title: "DASH (2017)",
      description:
        "Game code, graphics, music, and design belong to Max Zhou, Meggie Cheng, and Ariz Taqvi. Created in Gamemaker Studio. Won 10th place at FBLA Nationals Computer Game & Simulation Programming competition.",
      video: "/assets/DASHDemo.mp4",
      category: "Personal Projects",
    },
    {
      id: 1,
      title: "Sweet Dreams (2016)",
      description:
        "Game code, graphics, music, and design belong to Max Zhou, Meggie Cheng, and Ariz Taqvi. Created in Gamemaker Studio.",
      video: "/assets/SweetDreamsDemo.mp4",
      category: "Personal Projects",
    },
  ]);

  // --- Filter & Sort states ---
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // --- Filtering logic ---
  const filteredProjects = projects.filter(
    (proj) => filter === "All" || proj.category === filter
  );

  // --- Sorting logic ---
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "Newest") return b.id - a.id;
    if (sortBy === "Oldest") return a.id - b.id;
    if (sortBy === "Title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <>
      {/* --- Filter / Sort Controls --- */}
      <div className="controls" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "center" }}>
        <div className="filter">
          <span style={{ marginRight: "0.5rem", fontWeight: "bold" }}>Filter:</span>
          {["All", "Game Jams", "School Projects", "Personal Projects"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-btn ${filter === type ? "active" : ""}`}
              
            >
              {type}
            </button>
          ))}
        </div>

        <div className="sort">
          <span style={{ marginRight: "0.5rem", fontWeight: "bold" }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Title">Title (A–Z)</option>
          </select>
        </div>
      </div>

      {/* --- Project Cards --- */}
      {sortedProjects.map((proj) => (
        <div key={proj.id} className="project-card" style={{ marginBottom: "2rem" }}>
          <h2>{proj.title}</h2>

          {proj.youtube && (
            <div className="project-media" style={{ aspectRatio: "16/9" }}>
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
