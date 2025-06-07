// Cuando agregues una imagen, importala aquí
import gokuImg from './cards/goku.webp';
import vegetaImg from './cards/vegeta.webp';
import freezerImg from './cards/freezer.webp';
import piccoloImg from './cards/piccolo.webp';
import cellImg from './cards/cell.webp';
import gohanImg from './cards/gohan.webp';
import buuImg from './cards/buu.webp';
import trunksImg from './cards/trunks.webp';
import android17Img from './cards/android17.webp';
import brolyImg from './cards/broly.webp';
import hitImg from './cards/hit.webp';
import jirenImg from './cards/jiren.webp';

// Placeholder para imágenes que aún no están disponibles
const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23666"%3EImagen no disponible%3C/text%3E%3C/svg%3E';

// Intentamos usar la imagen si existe, si no, usamos el placeholder
const tryImage = (img: string) => {
  try {
    return img;
  } catch {
    return placeholderImg;
  }
};

export const images = {
  goku: tryImage(gokuImg),
  vegeta: tryImage(vegetaImg),
  freezer: tryImage(freezerImg),
  piccolo: tryImage(piccoloImg),
  cell: tryImage(cellImg),
  gohan: tryImage(gohanImg),
  buu: tryImage(buuImg),
  trunks: tryImage(trunksImg),
  android17: tryImage(android17Img),
  broly: tryImage(brolyImg),
  hit: tryImage(hitImg),
  jiren: tryImage(jirenImg)
} as const;

// Tipo para las keys de las imágenes
export type ImageKey = keyof typeof images; 