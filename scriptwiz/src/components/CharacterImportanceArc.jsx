import { Bar } from "react-chartjs-2";
import arcData from "../assets/500_DAYS_OF_SUMMER.pdf.json";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CharacterImportanceArc = () => {
  const characters = arcData.metadataStructured?.characters || [];

  // Calculate the number of scenes for each character
  const characterSceneCount = characters.map((character) => {
    const sceneCount = character.ages?.length || 0;
    return { name: character.name, sceneCount };
  });

  // Get the maximum number of scenes for scaling
  const maxScenes = Math.max(
    ...characterSceneCount.map((char) => char.sceneCount),
    1
  );

  // Calculate importance on a scale of 0-100
  const characterImportance = characterSceneCount.map((char) => ({
    name: char.name,
    importance: Math.round((char.sceneCount / maxScenes) * 100),
  }));

  // Chart data and options
  const data = {
    labels: characterImportance.map((char) => char.name),
    datasets: [
      {
        label: "Scene Dialogues",
        data: characterImportance.map((char) => char.importance),
        backgroundColor: "rgba(37, 150, 235, 0.8)",
        borderColor: "rgba(37, 150, 235, 1)",
        borderWidth: 1,
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
        text: "Scene Intensity Chart",
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
          text: "Characters",
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
          text: "Importance (%)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="flex w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CharacterImportanceArc;
