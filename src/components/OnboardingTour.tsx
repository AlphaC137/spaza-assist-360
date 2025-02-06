import Joyride, { CallBackProps, Step } from "react-joyride";
import { useEffect, useState } from "react";

const steps: Step[] = [
  {
    target: "body",
    content: "Welcome to Spaza Conecta! Let's show you around.",
    placement: "center",
  },
  {
    target: ".nav-home",
    content: "This is your home dashboard where you can access all features.",
  },
  {
    target: ".nav-registration",
    content: "Register your spaza shop and manage your business details here.",
  },
  {
    target: ".nav-compliance",
    content: "Stay compliant with all necessary regulations and requirements.",
  },
  {
    target: ".nav-document-hub",
    content: "Store and manage all your important documents securely.",
  },
  {
    target: ".nav-analytics",
    content: "Track your business performance and make data-driven decisions.",
  },
  {
    target: ".language-selector",
    content: "Choose your preferred language for using the application.",
  },
];

export function OnboardingTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished") {
      localStorage.setItem("hasSeenTour", "true");
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      styles={{
        options: {
          primaryColor: "#d395ff",
          textColor: "#1a1a1a",
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
}