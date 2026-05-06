import { TagDto, UserDto } from '../../generated';
import { ControlItem } from '../models';

export const toControlItems = (dtos: UserDto[] | TagDto[]): ControlItem<number>[] => {
  return dtos.flatMap(({ id, name }) => {
    if (id) {
      return { label: name, value: id };
    }
    return [];
  });
};
