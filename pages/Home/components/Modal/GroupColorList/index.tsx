import * as Style from './style';
import { Dispatch, SetStateAction } from 'react';
import { COLORS, GroupColor } from '@/constants';

interface GroupColorList {
  value: string;
  onChange: Dispatch<SetStateAction<GroupColor>>;
}

export const GroupColorList = ({ value, onChange }: GroupColorList) => {
  return (
    <Style.GroupColorList onClick={(e) => e.preventDefault()}>
      {COLORS.map((color) => {
        return (
          <Style.SelectedButton select={value === color} key={color}>
            <Style.ColorButton color={color} onClick={() => onChange(color)} />
          </Style.SelectedButton>
        );
      })}
    </Style.GroupColorList>
  );
};
