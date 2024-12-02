import { Line } from "react-chartjs-2";
import arcData from "../utils/arcMockdata.json";

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

const Arc = () => {
  // Mock data for the arc page generated using AI
  const scenes = arcData.scenes;

  // Calculate the intensity of each scene. Calculation is created using AI
  const calculateIntensity = (scene) => {
    return Math.min(
      1 +
        scene.cast_count * 0.5 +
        scene.dialogues_count * 1.5 +
        scene.props_count +
        scene.intimacy_count * 4 +
        scene.stunts_count * 5,
      10
    );
  };

  const intensities = scenes.map((scene) => calculateIntensity(scene));

  // Chart data and options
  const data = {
    labels: scenes.map((scene) => `Scene ${scene.scene_number}`),
    datasets: [
      {
        label: "Scene Intensity",
        data: intensities,
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
          text: "Intensity",
        },
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div className="flex w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default Arc;
