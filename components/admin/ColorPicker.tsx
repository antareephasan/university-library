import useClickOutside from "@/hooks/use-click-outside";
import React, { useCallback, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);
  const close = useCallback(() => toggle(false), []);
  useClickOutside({ ref: popover, handler: close });

  return (
    <div className="relative book-form_input rounded-md ">
      <div className="flex flex-row items-center gap-2">
        <div
          className="w-5 h-5 rounded-sm cursor-pointer"
          style={{ background: value }}
          onClick={() => toggle(!isOpen)}
        />
        <p className="hex-input">
          #
          <HexColorInput
            color={value}
            onChange={onPickerChange}
            className="hex-input"
          />
        </p>
      </div>
      {isOpen && (
        <div className="absolute" ref={popover}>
          <HexColorPicker color={value} onChange={onPickerChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
