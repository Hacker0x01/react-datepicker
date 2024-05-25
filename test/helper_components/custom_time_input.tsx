import React from "react";

type Props = {
  date?: Date;
  value?: string;
  onChange?: (date: string | undefined) => void;
  onTimeChange?: (value: Date | undefined) => void;
};

const CustomTimeInput: React.FC<Props> = ({
  onChange,
  onTimeChange,
  date,
  value,
  ...restProps
}) => (
  <input
    value={value}
    onChange={(e) =>
      onTimeChange ? onTimeChange(date) : onChange?.(e.target.value)
    }
    style={{ border: "solid 1px pink" }}
    {...restProps}
  />
);

export default CustomTimeInput;
