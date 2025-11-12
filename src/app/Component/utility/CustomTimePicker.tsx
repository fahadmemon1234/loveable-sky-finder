"use client";
import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

interface CustomTimePickerProps {
  value: string | null; // allow null
  onChange: (value: string | null) => void;
  label?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-gray-700 font-medium">
          {label} <span className="text-red-500">*</span>
        </label>
      )}
      <TimePicker
        onChange={onChange}
        value={value}
        clearIcon={null}
        clockIcon={null}
        className="w-full form-control rounded-md border border-[#ecb51e] text-[#ecb51e] focus:ring-2 focus:ring-[#ecb51e]"
        disableClock={true}
      />
    </div>
  );
};

export default CustomTimePicker;
