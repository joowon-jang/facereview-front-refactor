import { ReactElement, useEffect, useState } from "react";
import "./stepindicator.scss";

type StepIndicatorPropType = {
  step: number;
  maxStep: number;
  indicatorWidth?: number;
};

const StepIndicator = ({
  step,
  maxStep,
  indicatorWidth,
}: StepIndicatorPropType): ReactElement => {
  const [classArr, setClassArr] = useState<string[]>([]);

  useEffect(() => {
    const res: string[] = [];
    for (let i = 1; i <= maxStep; i++) {
      if (i < step) {
        res.push("activated");
        continue;
      }
      if (i === step) {
        res.push("active");
        continue;
      }
      res.push("");
    }
    setClassArr(res);
  }, [maxStep, step]);

  return (
    <div className="indicator-container">
      {classArr.map((c, idx) => (
        <div
          key={`indicator-${idx}`}
          className={`indicator ${c}`}
          style={indicatorWidth ? { width: indicatorWidth } : undefined}
        ></div>
      ))}
    </div>
  );
};

export default StepIndicator;
