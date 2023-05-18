import React, { useEffect, useState } from "react";
import GridHero from "./GridHero";
import { useP13nState } from "./p13n/hooks/useP13nState";
import { ImageType } from "@yext/pages/components";

type P13nHero = {
  title: string;
  description: string;
  image: ImageType;
  cta: { label: string; link: string };
};

interface HomeHeroProps {
  heros: {
    name: string;
    hero: P13nHero;
  }[];
}

const HomeHero = ({ heros }: HomeHeroProps) => {
  const gender = useP13nState((state) => state.gender);
  const [activeGridHero, setActiveGridHero] = useState<P13nHero>(heros[0].hero);

  useEffect(() => {
    if (gender === "Not Specified") {
      const hero = heros.find((hero) => hero.name === "Default");
      if (hero) {
        setActiveGridHero(hero.hero);
      } else {
        throw new Error("Default hero not found");
      }
    } else {
      const hero = heros.find((hero) => hero.name === gender);
      if (hero) {
        setActiveGridHero(hero.hero);
      } else {
        throw new Error("Invalid P13n filter");
      }
    }
  }, [gender]);

  return (
    <GridHero
      title={activeGridHero.title}
      subtitle={activeGridHero.description}
      image={activeGridHero.image}
      cta={activeGridHero.cta}
    />
  );
};

export default HomeHero;
