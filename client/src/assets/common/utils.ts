export function shuffle(array : Array<number>) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
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
]
