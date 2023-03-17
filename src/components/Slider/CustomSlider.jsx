import React from 'react';
import { Slider, Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function CustomSlider({
  fieldName,
  bgColor,
  label,
  description,
  value,
  ...props
}) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <div
          onMouseDown={close}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <label
            className="slider__label"
            htmlFor={label}
          >
            {label}
          </label>
          <Slider
            value={value}
            className="slider-width"
            id={label}
            {...props}
          />
        </div>
      </Popover.Target>
      {description && (
        <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
          <Text
            c="black"
            size="sm"
          >
            {description}
          </Text>
        </Popover.Dropdown>
      )}
    </Popover>
  );
}
