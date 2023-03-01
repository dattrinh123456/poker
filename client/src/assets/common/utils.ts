import { Observer, Subject } from 'rxjs';

export function shuffle(
  array: Array<number> = [...new Array(52)].map((x, index) => index + 1)
) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const avatars = [
  'anime1.jpg',
  'anime2.jpg',
  'anime3.jpg',
  'anime4.jpg',
  'anime5.jpg',
  'anime6.jpg',
  'anime7.jpg',
  'anime8.jpg',
  'anime9.jpg',
  'anime10.jpg',
];

export const CARDS = {
  S: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  C: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  D: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  H: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};

export function getCard(number: number) {
  if (number <= 13) {
    return String(number + 'S');
  } else if (number <= 26) {
    return String(number - 13 + 'C');
  } else if (number <= 39) {
    return String(number - 26 + 'D');
  } else return String(number - 39 + 'H');
}

export function unsubscribe(observer: any) : void {
  observer.next();
  observer.complete();
}
