import { Line } from "react-chartjs-2";
import arcData from "../assets/500_DAYS_OF_SUMMER.pdf.json";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const CharacterArc = ({ characterName }) => {
  const scenes = arcData.scenes;

  // Calculate importance for the given character in each scene
  const calculateImportance = (scene) => {
    const baseImportance = 5;

    // Check if the character is listed as a cast member
    const isCastMember = scene.elements.cast_members.some(
      (cast) => cast.name.toLowerCase() === characterName.toLowerCase()
    );

    // Number of dialogues
    const dialogues = (
      scene.sceneText.match(new RegExp(`\\b${characterName}\\b`, "gi")) || []
    ).length;

    // Actions related to the character in "intimacy"
    const actions = scene.elements.intimacy.filter((action) =>
      action.toLowerCase().includes(characterName.toLowerCase())
    ).length;

    if (!isCastMember && dialogues === 0 && actions === 0) {
      // Skip the scene if the character isn't involved and not a cast member
      return 0;
    }

    // Scene duration in minutes
    const sceneDuration = scene.shooting_time
      ? scene.shooting_time.hour * 60 + scene.shooting_time.minute
      : 0;

    // Number of pages
    const pages = scene.pages || 0;

    // Adjust weights as needed
    const dialogueWeight = 2;
    const actionWeight = 3;
    const durationWeight = 0.5;
    const pageWeight = 1;

    return (
      baseImportance +
      dialogues * dialogueWeight +
      actions * actionWeight +
      sceneDuration * durationWeight +
      pages * pageWeight
    );
  };

  // Calculate raw importance scores for all scenes where the character is involved
  const rawImportanceData = scenes.map((scene) => calculateImportance(scene));

  // Check if calculations vary for debugging
  console.log(`Importance Data for ${characterName}:`, rawImportanceData);

  // Find the minimum and maximum importance scores
  const minImportance = Math.min(...rawImportanceData);
  const maxImportance = Math.max(...rawImportanceData);

  // Avoid divide-by-zero when min and max are equal
  const normalizedImportanceData =
    minImportance === maxImportance
      ? rawImportanceData.map(() => 50) // Assign all to a neutral value if no variation
      : rawImportanceData.map((value) =>
          Math.round(
            ((value - minImportance) / (maxImportance - minImportance)) * 100
          )
        );

  const data = {
    labels: scenes.map((scene) => `Scene ${scene.scene_number}`),
    datasets: [
      {
        label: `Importance of ${characterName}`,
        data: normalizedImportanceData,
        borderColor: "rgba(37, 150, 235, 1)",
        borderWidth: 4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: false,
          text: "Time (Scenes)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: false,
          text: "Importance (0–100)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="flex w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default CharacterArc;
