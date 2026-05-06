import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';

export type Value = number | string;

export interface ControlItem<T> {
  value: T;
  label: string;
}

export type TextfieldSize = TuiSizeL | TuiSizeS;
