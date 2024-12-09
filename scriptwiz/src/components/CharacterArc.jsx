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
    const baseImportance = 0;

    // Check if the character is listed as a cast member
    const isCastMember = scene.elements.cast_members.some(
      (cast) => cast.name.toLowerCase() === characterName.toLowerCase()
    );

    // Number of dialogues directly involving the character
    const dialogues = (
      scene.sceneText.match(new RegExp(`\\b${characterName}\\b`, "gi")) || []
    ).length;

    // Number of mentions of the character
    const mentions = (
      scene.sceneText.match(new RegExp(characterName, "gi")) || []
    ).length;

    // Interactions with other main characters
    const mainCharacters = scene.elements.cast_members.map((cast) =>
      cast.name.toLowerCase()
    );
    const interactionCount = mainCharacters.filter(
      (name) =>
        name !== characterName.toLowerCase() &&
        scene.sceneText.toLowerCase().includes(name)
    ).length;

    // Emotional stakes (keywords to assess tone)
    const emotionalStakesKeywords = ["angry", "crying", "yelling", "love"];
    const emotionalStakes = emotionalStakesKeywords.some((keyword) =>
      scene.sceneText.toLowerCase().includes(keyword)
    )
      ? 5
      : 0;

    // Scene duration in minutes
    const sceneDuration = scene.shooting_time
      ? scene.shooting_time.hour * 60 + scene.shooting_time.minute
      : 0;

    // Number of pages
    const pages = scene.pages || 0;

    // Weights for each factor
    const weights = {
      castMemberWeight: 1,
      dialogueWeight: 2,
      mentionWeight: 1,
      interactionWeight: 2,
      emotionalStakesWeight: 5,
      durationWeight: 0.5,
      pageWeight: 1,
    };

    return (
      baseImportance +
      (isCastMember ? weights.castMemberWeight : 0) +
      dialogues * weights.dialogueWeight +
      mentions * weights.mentionWeight +
      interactionCount * weights.interactionWeight +
      emotionalStakes * weights.emotionalStakesWeight +
      sceneDuration * weights.durationWeight +
      pages * weights.pageWeight
    );
  };

  // Calculate raw importance scores for all scenes where the character is involved
  const rawImportanceData = scenes.map((scene) => calculateImportance(scene));

  // Check if calculations vary for debugging
  console.log(`Importance Data for ${characterName}:`, rawImportanceData);

  // Find the minimum and maximum importance scores
  const minImportance = Math.min(...rawImportanceData);
  const maxImportance = Math.max(...rawImportanceData);

  const normalizedImportanceData =
    minImportance === maxImportance
      ? rawImportanceData.map(() => 2)
      : rawImportanceData.map((value) =>
          Math.round(
            ((value - minImportance) / (maxImportance - minImportance)) * 10
          )
        );

  const data = {
    labels: scenes.map((scene) => `Scene ${scene.scene_number}`),
    datasets: [
      {
        label: `Impact of ${characterName}`,
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
          text: "Importance (0–10)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
        beginAtZero: true,
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

export default CharacterArc;
