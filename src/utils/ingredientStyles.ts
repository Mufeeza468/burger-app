export const INGREDIENTS = ["lettuce", "bacon", "cheese", "meat"] as const;

export type IngredientType = (typeof INGREDIENTS)[number];

export const getIngredientStyle = (
  ingredient: IngredientType,
  isMobile: boolean = false
): React.CSSProperties => {
  switch (ingredient) {
    case "lettuce":
      return {
        backgroundColor: "#4CAF50",
        height: "18px",
        width: isMobile ? "80%" : "100%",
        margin: "4px auto",
        borderRadius: "20px",
        textAlign: "center",
        color: "white",
        fontSize: "0.75rem",
        boxShadow: "inset 0 0 4px #2e7d32",
      };

    case "bacon":
      return {
        backgroundColor: "#D2691E",
        height: "10px",
        width: isMobile ? "80%" : "100%",
        margin: "4px auto",
        borderRadius: "4px",
        textAlign: "center",
        color: "white",
        fontSize: "0.75rem",
        boxShadow: "inset 0 0 4px #a0522d",
      };

    case "cheese":
      return {
        backgroundColor: "#FFD700",
        height: "14px",
        width: isMobile ? "80%" : "100%",
        margin: "4px auto",
        borderRadius: "8px",
        textAlign: "center",
        color: "#333",
        fontSize: "0.75rem",
        boxShadow: "inset 0 0 3px #d4af37",
      };

    case "meat":
      return {
        backgroundColor: "#8B4513",
        height: "25px",
        width: isMobile ? "80%" : "100%",
        margin: "4px auto",
        borderRadius: "10px",
        textAlign: "center",
        color: "white",
        fontSize: "0.75rem",
        boxShadow: "inset 0 0 5px #5c2e0f",
      };

    default:
      return {
        backgroundColor: "#ccc",
        height: "15px",
        width: isMobile ? "80%" : "100%",
        margin: "4px auto",
        borderRadius: "4px",
        textAlign: "center",
        color: "black",
        fontSize: "0.75rem",
      };
  }
};
