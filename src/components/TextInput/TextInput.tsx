import React, { ReactElement } from "react";
import "./textinput.scss";

type TextInputPropsType = {
  id?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  style?: React.CSSProperties;
};

const TextInput = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  style,
}: TextInputPropsType): ReactElement => {
  return (
    <input
      id={id}
      type={type}
      className="text-input font-body-large"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      style={style}
    />
  );
};

export default TextInput;
