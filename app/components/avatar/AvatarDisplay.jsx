"use client";

import { useEffect, useState } from "react";
import { generateAvatar } from "../../utils/dicebear";

const AvatarDisplay = ({ config, className }) => {
  const [avatarSvg, setAvatarSvg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateAvatar = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!config) return;

        const svg = generateAvatar(config);

        if (svg) {
          setAvatarSvg(svg);
        } else {
          throw new Error("Impossible de générer l'avatar");
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'avatar:", err);
        setError("Une erreur est survenue lors du chargement de l'avatar");
      } finally {
        setIsLoading(false);
      }
    };

    updateAvatar();
  }, [config]); // Dépendance à config pour se mettre à jour quand la configuration change

  if (isLoading) {
    return <div>Chargement de l'avatar...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className={`flex justify-center items-center ${className || ""}`}>
      <div
        className={className}
        dangerouslySetInnerHTML={{
          __html: avatarSvg || "",
        }}
      />
    </div>
  );
};

export default AvatarDisplay;
