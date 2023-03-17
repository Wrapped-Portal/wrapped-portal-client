import React from 'react';
import { Slider, Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setFieldValue } from '../../store/reducers/soundBoardSlice';

export default function CustomSlider({
  fieldName,
  bgColor,
  label,
  description,
  ...props
}) {
  const [opened, { close, open }] = useDisclosure(false);
  const dispatch = useDispatch();

  const value = useSelector((state) => state.soundBoardSlice[fieldName]);

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
          color="lime"
            value={value}
            className="slider-width"
            id={label}
            onChange={(value) => {
              console.log(value);
              dispatch(
                setFieldValue({
                  field: fieldName,
                  value: value,
                }),
              );
            }}
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
