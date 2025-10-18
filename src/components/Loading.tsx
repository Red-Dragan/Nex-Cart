import React from "react";
import styles from "../styles/Loading.module.css";

interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "bars";
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  variant = "spinner",
  size = "medium",
  fullScreen = false,
  text = "Loading...",
}) => {
  const sizeClass = styles[size];
  const containerClass = fullScreen
    ? styles.fullScreenContainer
    : styles.container;

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div className={`${styles.spinner} ${sizeClass}`}>
            <div className={styles.spinnerCircle}></div>
          </div>
        );

      case "dots":
        return (
          <div className={`${styles.dots} ${sizeClass}`}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        );

      case "pulse":
        return (
          <div className={`${styles.pulse} ${sizeClass}`}>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseRing}></div>
          </div>
        );

      case "bars":
        return (
          <div className={`${styles.bars} ${sizeClass}`}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={containerClass}>
      <div className={styles.loaderWrapper}>
        {renderLoader()}
        {text && <p className={styles.loadingText}>{text}</p>}
      </div>
    </div>
  );
};

export default Loading;
