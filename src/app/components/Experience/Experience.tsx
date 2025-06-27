"use client";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import data from "../../data/data.json";

type LightEffectOptions = {
  x: number | string;
  y: number | string;
  opacity: number;
};

type CardInteractionParams = {
  container: HTMLDivElement;
  lightEffect: HTMLElement | null;
  outerLightEffects: HTMLElement | null;
  setCardStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setInfoStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  cardStyle: React.CSSProperties;
  infoStyle: React.CSSProperties;
};

const Experience = () => {
  const useCardEffect = (cardNumber: number) => {
    const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
    const [infoStyle, setInfoStyle] = useState<React.CSSProperties>({});
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const lightEffect = document.getElementById(`experience-card-content${cardNumber}`);
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

      container.addEventListener("mousemove", handleInteractions.handleMouseMove);
      container.addEventListener("mouseleave", handleInteractions.handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleInteractions.handleMouseMove);
        container.removeEventListener("mouseleave", handleInteractions.handleMouseLeave);
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
  }: CardInteractionParams) => {
    const getMouseDirection = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const middleX = rect.width / 4;
      const middleY = rect.height / 4;

      const deltaX = x - middleX;
      const deltaY = y - middleY;

      return { deltaX, deltaY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { deltaX, deltaY } = getMouseDirection(e, container);

      const rotateY = deltaX > 0 ? -10 : 10;
      const rotateX = deltaY > 0 ? 10 : -10;

      updateLightEffects(lightEffect, outerLightEffects, {
        x: deltaX + 120,
        y: deltaY + 110,
        opacity: 0.3,
      });

      setCardStyle({
        transform: `rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`,
        width: "100%",
        height: "100%",
        transition: "transform 0.8s ease",
        transformStyle: "preserve-3d",
      });

      setInfoStyle({
        transform: `rotateY(${rotateY * 0.8}deg) rotateX(${rotateX * 0.8}deg) translateZ(50px)`,
        transition: "transform 0.8s ease",
        transformStyle: "preserve-3d",
      });
    };

    const handleMouseLeave = () => {
      updateLightEffects(lightEffect, outerLightEffects, {
        x: "50%",
        y: "50%",
        opacity: 0.1,
      });

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

  const updateLightEffects = (
    lightEffect: HTMLElement | null,
    outerLightEffects: HTMLElement | null,
    { x, y, opacity }: LightEffectOptions
  ) => {
    if (lightEffect) {
      lightEffect.style.setProperty("--x", typeof x === "string" ? x : `${x}px`);
      lightEffect.style.setProperty("--y", typeof y === "string" ? y : `${y}px`);
      lightEffect.style.setProperty("--o", opacity.toString());
    }

    if (outerLightEffects) {
      outerLightEffects.style.setProperty("--x", typeof x === "string" ? x : `${x}px`);
      outerLightEffects.style.setProperty("--y", typeof y === "string" ? y : `${y}px`);
    }
  };

  const card1 = useCardEffect(1);
  const card2 = useCardEffect(2);
  const card3 = useCardEffect(3);
  const card4 = useCardEffect(4);

  const cardData = [card1, card2, card3, card4].map((card, i) => ({
    index: i + 1,
    containerRef: card.containerRef,
    cardStyle: card.cardStyle,
    infoStyle: card.infoStyle,
    ...data.experienceCards[i], // assumes your `data.json` has a corresponding structure
  }));

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
                    <div data-w-id="3488554c-fe1a-ba8d-8eaa-2749383949b9" className="light-wrapper-in-front">
                      <div className="w-ful h-full light-outside" id={card.lightOutsideId}></div>
                    </div>

                    <div className="experience-card-content" id={card.contentId}>
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

                      <div className={card.textHolderClassName} style={card.infoStyle}>
                        <div className="card-title">{card.title}</div>
                        <div className="experience-paragraph-holder">
                          <p className={card.paragraphClassName}>{card.description}</p>
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
                          {card.gradientClassName && <div className={card.gradientClassName}></div>}
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
