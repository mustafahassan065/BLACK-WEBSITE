"use client";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import data from "../../data/data.json";

const Experience = () => {
  const useCardEffect = (cardNumber:number) => {
    const [cardStyle, setCardStyle] = useState({});
    const [infoStyle, setInfoStyle] = useState({});
    const containerRef = useRef(null);

    useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const lightEffect = document.getElementById(
    `experience-card-content${cardNumber}`
  );
  const outerLightEffects = document.getElementById(
    cardNumber === 1 ? "light-outside" : `light-outside-${cardNumber}`
  );

  updateLightEffects(lightEffect, outerLightEffects, {
    x: "50%",
    y: "50%",
    opacity: 0.1,
  });

  const handleInteractions = setupCardInteractions({
    container,
    lightEffect,
    outerLightEffects,
    setCardStyle,
    setInfoStyle,
    cardStyle,
    infoStyle,
  });

  container.addEventListener(
    "mousemove",
    handleInteractions.handleMouseMove
  );
  container.addEventListener(
    "mouseleave",
    handleInteractions.handleMouseLeave
  );

  return () => {
    container.removeEventListener(
      "mousemove",
      handleInteractions.handleMouseMove
    );
    container.removeEventListener(
      "mouseleave",
      handleInteractions.handleMouseLeave
    );
  };
}, [cardNumber, cardStyle, infoStyle]);


    return { cardStyle, infoStyle, containerRef };
  };

  const setupCardInteractions = ({
    container,
    lightEffect,
    outerLightEffects,
    setCardStyle,
    setInfoStyle,
    cardStyle,
    infoStyle,
  }) => {
    const getMouseDirection = (e, element) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const middleX = rect.width / 4;
      const middleY = rect.height / 4;

      const deltaX = x - middleX;
      const deltaY = y - middleY;

      return { deltaX, deltaY };
    };

    const handleMouseMove = (e) => {
      const { deltaX, deltaY } = getMouseDirection(e, container);

      let rotateY = deltaX > 0 ? -10 : 10;
      let rotateX = deltaY > 0 ? 10 : -10;

      // Update light effects
      updateLightEffects(lightEffect, outerLightEffects, {
        x: deltaX + 120,
        y: deltaY + 110,
        opacity: 0.3,
      });

      // Update card style
      setCardStyle({
        transform: `rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`,
        width: "100%",
        height: "100%",
        transition: "transform 0.8s ease",
        transformStyle: "preserve-3d",
      });

      // Update info content style
      setInfoStyle({
        transform: `rotateY(${rotateY * 0.8}deg) rotateX(${
          rotateX * 0.8
        }deg) translateZ(50px)`,
        transition: "transform 0.8s ease",
        transformStyle: "preserve-3d",
      });
    };

    const handleMouseLeave = () => {
      // Reset light effects
      updateLightEffects(lightEffect, outerLightEffects, {
        x: "50%",
        y: "50%",
        opacity: 0.1,
      });

      // Reset card and info styles
      setCardStyle({
        ...cardStyle,
        transform: "rotateY(0deg) rotateX(0deg)",
      });

      setInfoStyle({
        ...infoStyle,
        transform: "translateZ(50px)",
      });
    };

    return { handleMouseMove, handleMouseLeave };
  };

  // function to update light effects
  const updateLightEffects = (
    lightEffect,
    outerLightEffects,
    { x, y, opacity }
  ) => {
    if (lightEffect) {
      lightEffect.style.setProperty(
        "--x",
        typeof x === "string" ? x : `${x}px`
      );
      lightEffect.style.setProperty(
        "--y",
        typeof y === "string" ? y : `${y}px`
      );
      lightEffect.style.setProperty("--o", opacity);
    }

    if (outerLightEffects) {
      outerLightEffects.style.setProperty(
        "--x",
        typeof x === "string" ? x : `${x}px`
      );
      outerLightEffects.style.setProperty(
        "--y",
        typeof y === "string" ? y : `${y}px`
      );
    }
  };

  //  custom hook for each card
  const card1 = useCardEffect(1);
  const card2 = useCardEffect(2);
  const card3 = useCardEffect(3);
  const card4 = useCardEffect(4);

  //  data array with original IDs and classes
  const cardData = [
    {
      index: 1,
      containerRef: card1.containerRef,
      cardStyle: card1.cardStyle,
      infoStyle: card1.infoStyle,
      wrapperNodeId: "w-node-_1261dedf-b3c9-2162-53e7-29ae1d8c7955-5ffe7f77",
      cardNodeId: "w-node-c9a3eb7f-e26e-bb52-e19d-39f848eddb94-5ffe7f77",
      cardDataId: "c9a3eb7f-e26e-bb52-e19d-39f848eddb94",
      wrapperClassName: "experience-wrapper ",
      cardClassName: "experience-card relative",
      contentId: "experience-card-content1",
      lightOutsideId: "light-outside",
      lightWrapperId: "light-wrapper",
      imageUrl:data.expertOne,
      imageHolderClassName: "experience-card-image-holder",
      gradientClassName: "experience-gradient",
      textHolderClassName: "experience-card-text-holder",
      title: "Effortlessly tracking with Black",
      description:
        "Designed for you, Black is the perfect solution for you and your teams tracking time.",
      paragraphClassName: "mainTexts",
      hasImageFirst: true,
    },
    {
      index: 2,
      containerRef: card2.containerRef,
      cardStyle: card2.cardStyle,
      infoStyle: card2.infoStyle,
      wrapperNodeId: "w-node-_8c828c4b-063f-f20f-6482-b138be2c6dbe-5ffe7f77",
      cardNodeId: "w-node-_7c769986-af35-2c7e-a088-51a92c6e6099-5ffe7f77",
      wrapperClassName: "experience-wrapper",
      cardClassName: "experience-card",
      contentId: "experience-card-content2",
      lightOutsideId: "light-outside-2",
      imageUrl:data["level-1"],
      imageHolderClassName: "experience-card-image-holder _02",
      gradientClassName: "experience-gradient",
      textHolderClassName: "experience-card-text-holder _02",
      title: "Save time your time",
      description:
        "Available on iOS and Android, Black is accessible from any device.",
      hasImageFirst: true,
    },
    {
      index: 3,
      containerRef: card3.containerRef,
      cardStyle: card3.cardStyle,
      infoStyle: card3.infoStyle,
      wrapperNodeId: "w-node-_7c369291-b38e-0008-5e70-efcc18461d4c-5ffe7f77",
      cardNodeId: "w-node-_7c369291-b38e-0008-5e70-efcc18461d4d-5ffe7f77",
      wrapperClassName: "experience-wrapper",
      cardClassName: "experience-card",
      contentId: "experience-card-content3",
      lightOutsideId: "light-outside-3",
      imageUrl:data["level-2"],
      imageHolderClassName: "experience-card-image-holder smaller",
      gradientClassName: "experience-gradient _02",
      textHolderClassName: "experience-card-text-holder _02",
      title: "Tracking",
      description:
        "Comes with built-in workflows that create focus and routine.",
      hasImageFirst: true,
    },
    {
      index: 4,
      containerRef: card4.containerRef,
      cardStyle: card4.cardStyle,
      infoStyle: card4.infoStyle,
      wrapperNodeId: "w-node-_7a405be8-0a26-057e-3bd3-7289f3f9886f-5ffe7f77",
      cardNodeId: "w-node-_7a405be8-0a26-057e-3bd3-7289f3f98870-5ffe7f77",
      wrapperClassName: "experience-wrapper",
      cardClassName: "experience-card",
      contentId: "experience-card-content4",
      lightOutsideId: "light-outside-4",
      imageUrl:data["level-3"],
      imageHolderClassName: "experience-card-image-holder",
      textHolderClassName: "experience-card-text-holder padding",
      title: "Experience seamless tracking",
      description:
        "Awarded App of the day, Black has been recognized as the top choice for teams and individuals.",
      hasImageFirst: false,
    },
  ];

  return (
    <section id="experience" data-section="Experience" className="section">
      <div className="container">
        <div className="experience-section">
          <div className="center-title">
            <div className="title-holder">
              <h1 className="title">{data.experience_heading}</h1>
            </div>
          </div>

          <div className="experience-cards-holder">
            <div className="experience-grid">
              {cardData.map((card) => (
                <div
                  key={card.index}
                  id={card.wrapperNodeId}
                  className={card.wrapperClassName}
                  ref={card.containerRef}
                  style={{ perspective: "1600px" }}
                >
                  <div
                    id={card.cardNodeId}
                    data-w-id={card.cardDataId}
                    className={card.cardClassName}
                    style={card.cardStyle}
                  >
                    <div
                      data-w-id="3488554c-fe1a-ba8d-8eaa-2749383949b9"
                      className="light-wrapper-in-front"
                    >
                      <div
                        className="w-ful h-full light-outside"
                        id={card.lightOutsideId}
                      ></div>
                    </div>

                    <div
                      className="experience-card-content"
                      id={card.contentId}
                    >
                      {card.hasImageFirst && (
                        <div className={card.imageHolderClassName}>
                          <img
                            src={card.imageUrl}
                            loading="lazy"
                            alt=""
                            className="experience-card-image"
                          />
                          <div className={card.gradientClassName}></div>
                        </div>
                      )}

                      <div
                        className={card.textHolderClassName}
                        style={card.infoStyle}
                      >
                        <div className="card-title">{card.title}</div>
                        <div className="experience-paragraph-holder">
                          <p className={card.paragraphClassName}>
                            {card.description}
                          </p>
                        </div>
                      </div>

                      {!card.hasImageFirst && (
                        <div className={card.imageHolderClassName}>
                          <img
                            src={card.imageUrl}
                            loading="lazy"
                            alt=""
                            className="experience-card-image"
                          />
                          {card.gradientClassName && (
                            <div className={card.gradientClassName}></div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="light-wrapper" id={card.lightWrapperId}>
                      <div className="light">
                        <div className="light-inside"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
