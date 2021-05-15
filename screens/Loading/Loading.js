import React from "react";
import LotteView from "lottie-react-native";

import loading from "../../assets/loading.json";

function Loading({ style }) {
  return (
    <LotteView
      loop
      autoPlay
      speed={1}
      source={loading}
      style={[{ backgroundColor: "#222542" }, style ]}
    />
  );
}

export default Loading;
