import { Line } from "react-chartjs-2";
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
  const scenes = [
    {
      scene_number: 1,
      cast_count: 2,
      dialogues_count: 1,
      props_count: 1,
      intimacy_count: 1,
      stunts_count: 0,
    },
    {
      scene_number: 2,
      cast_count: 1,
      dialogues_count: 1,
      props_count: 3,
      intimacy_count: 0,
      stunts_count: 0,
    },
    {
      scene_number: 3,
      cast_count: 1,
      dialogues_count: 0,
      props_count: 2,
      intimacy_count: 0,
      stunts_count: 0,
    },
    {
      scene_number: 4,
      cast_count: 3,
      dialogues_count: 3,
      props_count: 1,
      intimacy_count: 2,
      stunts_count: 1,
    },
    {
      scene_number: 5,
      cast_count: 2,
      dialogues_count: 2,
      props_count: 1,
      intimacy_count: 1,
      stunts_count: 1,
    },
    {
      scene_number: 6,
      cast_count: 1,
      dialogues_count: 1,
      props_count: 1,
      intimacy_count: 0,
      stunts_count: 0,
    },
    {
      scene_number: 7,
      cast_count: 2,
      dialogues_count: 2,
      props_count: 1,
      intimacy_count: 1,
      stunts_count: 0,
    },
    {
      scene_number: 8,
      cast_count: 1,
      dialogues_count: 0,
      props_count: 0,
      intimacy_count: 0,
      stunts_count: 0,
    },
    {
      scene_number: 9,
      cast_count: 3,
      dialogues_count: 3,
      props_count: 1,
      intimacy_count: 2,
      stunts_count: 1,
    },
    {
      scene_number: 10,
      cast_count: 2,
      dialogues_count: 2,
      props_count: 1,
      intimacy_count: 1,
      stunts_count: 1,
    },
    {
      scene_number: 11,
      cast_count: 1,
      dialogues_count: 1,
      props_count: 1,
      intimacy_count: 0,
      stunts_count: 0,
    },
    {
      scene_number: 12,
      cast_count: 2,
      dialogues_count: 2,
      props_count: 1,
      intimacy_count: 1,
      stunts_count: 0,
    },
    {
      scene_number: 13,
      cast_count: 1,
      dialogues_count: 0,
      props_count: 0,
      intimacy_count: 0,
      stunts_count: 0,
    },
    {
      scene_number: 14,
      cast_count: 3,
      dialogues_count: 3,
      props_count: 1,
      intimacy_count: 2,
      stunts_count: 1,
    },
    {
      scene_number: 15,
      cast_count: 2,
      dialogues_count: 2,
      props_count: 1,
      intimacy_count: 1,
      stunts_count: 1,
    },
  ];

  const calculateIntensity = (scene) => {
    return Math.min(
      1 +
        scene.cast_count * 2 +
        scene.dialogues_count * 3 +
        scene.props_count +
        scene.intimacy_count * 4 +
        scene.stunts_count * 5,
      10
    );
  };

  const intensities = scenes.map((scene) => calculateIntensity(scene));

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
