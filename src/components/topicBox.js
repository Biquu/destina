import React, { useState, useEffect } from "react";
import Image from "next/image";
import { imageAssets } from "@/utils"; // Assuming imageAssets contains URLs of images

const TopicBox = ({ topics, onSelectTopic }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSelectTopic(selectedTopics);
      console.log("Bura çalıştı: ", selectedTopics);

    }, 29500); // 30 seconds timer for selecting topics

    return () => clearTimeout(timer);
  }, [selectedTopics]);

  const handleLeaveClick = () => {};

  const handleSelection = (label) => {
    setSelectedTopics((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((topic) => topic !== label);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, label];
      } else {
        return [...prevSelected.slice(1), label];
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative">
      <h2 className="font-bold m-4 flex justify-center items-center text-blue text-2xl font-medium mb-2">
        Konu Seç
      </h2>
      <div className="flex flex-wrap justify-center w-full h-full relative">
        {topics.map((topic, index) => (
          <div
            key={index}
            className={`absolute flex items-center justify-center 
                ${
                  index === 0
                    ? "translate-x-[160%] translate-y-[80%]"
                    : index === 1
                    ? "translate-x-[80%] translate-y-[0%]"
                    : index === 2
                    ? "translate-x-[80%] translate-y-[150%]"
                    : index === 3
                    ? "translate-x-[-160%] translate-y-[80%]"
                    : index === 4
                    ? "translate-x-[-80%] translate-y-[0%]"
                    : index === 5
                    ? "translate-x-[-80%] translate-y-[150%]"
                    : ""
                }`}
          >
            <div
              className={`flex flex-col justify-center cursor-pointer rounded-full ${
                selectedTopics.includes(topic.label) ? "bg-blue/30" : ""
              }`}
              onClick={() => handleSelection(topic.label)}
            >
              <div className="rounded-full w-[200px] h-[200px] flex flex-col justify-center items-center">
                <Image
                  src={topic.src}
                  alt={topic.label}
                  className="w-[150px] h-[150px] "
                />
                <p className="font-bold flex justify-center items-center text-darkest-blue text-2xl font-medium">
                  {topic.label}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div
          className="flex justify-center items-center cursor-pointer absolute bottom-8"
          onClick={handleLeaveClick}
        >
          <h1 className="flex justify-center text-darkest-orange text-xl font-medium">
            Ayrıl
          </h1>
          <Image
            src={imageAssets.Leave}
            alt="Leave"
            className=" w-[20px] ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default TopicBox;
