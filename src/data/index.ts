import type { Design } from "./types";
import { categories } from "./taxonomy";

import arabicDesigns from "./designs/arabic.json";
import indianDesigns from "./designs/indian.json";
import pakistaniDesigns from "./designs/pakistani.json";
import moroccanDesigns from "./designs/moroccan.json";
import gulfDesigns from "./designs/gulf.json";
import africanDesigns from "./designs/african.json";
import turkishDesigns from "./designs/turkish.json";
import rajasthaniDesigns from "./designs/rajasthani.json";
import indonesianDesigns from "./designs/indonesian.json";
import bridalDesigns from "./designs/bridal.json";
import simpleDesigns from "./designs/simple.json";
import modernDesigns from "./designs/modern.json";
import traditionalDesigns from "./designs/traditional.json";
import minimalDesigns from "./designs/minimal.json";
import floralDesigns from "./designs/floral.json";
import mandalaDesigns from "./designs/mandala.json";
import geometricDesigns from "./designs/geometric.json";
import jewelryDesigns from "./designs/jewelry.json";
import royalDesigns from "./designs/royal.json";
import fullHandDesigns from "./designs/full-hand.json";
import backHandDesigns from "./designs/back-hand.json";
import frontHandDesigns from "./designs/front-hand.json";
import fingerDesigns from "./designs/finger.json";
import footDesigns from "./designs/foot.json";
import eidDesigns from "./designs/eid.json";
import kidsDesigns from "./designs/kids.json";

export const allDesigns: Design[] = [
  ...arabicDesigns,
  ...indianDesigns,
  ...pakistaniDesigns,
  ...moroccanDesigns,
  ...gulfDesigns,
  ...africanDesigns,
  ...turkishDesigns,
  ...rajasthaniDesigns,
  ...indonesianDesigns,
  ...bridalDesigns,
  ...simpleDesigns,
  ...modernDesigns,
  ...traditionalDesigns,
  ...minimalDesigns,
  ...floralDesigns,
  ...mandalaDesigns,
  ...geometricDesigns,
  ...jewelryDesigns,
  ...royalDesigns,
  ...fullHandDesigns,
  ...backHandDesigns,
  ...frontHandDesigns,
  ...fingerDesigns,
  ...footDesigns,
  ...eidDesigns,
  ...kidsDesigns,
] as Design[];

export const designBySlug = new Map<string, Design>(
  allDesigns.map((d) => [d.slug, d])
);

export const designsByCategory = new Map<string, Design[]>();
for (const cat of categories) {
  designsByCategory.set(
    cat.slug,
    allDesigns.filter((d) => d.categories.includes(cat.slug))
  );
}

export const designsByOccasion = new Map<string, Design[]>();
for (const d of allDesigns) {
  if (d.occasion) {
    const arr = designsByOccasion.get(d.occasion) ?? [];
    arr.push(d);
    designsByOccasion.set(d.occasion, arr);
  }
}

export const designsByBodyPart = new Map<string, Design[]>();
for (const d of allDesigns) {
  if (d.bodyPart) {
    const arr = designsByBodyPart.get(d.bodyPart) ?? [];
    arr.push(d);
    designsByBodyPart.set(d.bodyPart, arr);
  }
}
