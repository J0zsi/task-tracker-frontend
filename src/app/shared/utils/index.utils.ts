import { from, map, pipe, switchMap } from 'rxjs';

export const blobToJson = <T>() =>
  pipe(
    switchMap((blob) => from((blob as Blob).text())),
    map((text) => JSON.parse(text) as T),
  );
