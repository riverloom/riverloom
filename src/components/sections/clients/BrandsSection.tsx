import { readdirSync, existsSync } from "fs";
import path from "path";
import BrandsMarquee, { type BrandImage } from "./BrandsMarquee";

/* ─── Supported extensions ─── */
const SUPPORTED = [".svg", ".png", ".webp", ".jpg", ".jpeg",".avif"];

/* ─── Derive a display name from a filename ─── */
function nameFromFile(file: string): string {
  const stem = path.basename(file, path.extname(file));
  return stem
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/(removebgpreview|logo|Icon)/gi, "")
    .trim();
}

/* ─── Shuffle (deterministic using a simple sort) ─── */
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(i * 0.618) % (i + 1); // golden ratio shuffle
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ─── Server component ─── */
export default function BrandsSection() {
  const brandsDir = path.join(process.cwd(), "public", "assets", "brands");

  if (!existsSync(brandsDir)) {
    return <BrandsMarquee brands={[]} brandsTwo={[]} />;
  }

  const files = readdirSync(brandsDir);

  const allBrands: BrandImage[] = files
    .filter((file) => SUPPORTED.includes(path.extname(file).toLowerCase()))
    .map((file) => ({
      src: `/assets/brands/${file}`,
      name: nameFromFile(file),
    }));

  const shuffled = shuffle(allBrands);
  const mid = Math.ceil(shuffled.length / 2);
  const brandsOne = shuffled.slice(0, mid);
  const brandsTwo = shuffled.slice(mid);

  return <BrandsMarquee brands={brandsOne} brandsTwo={brandsTwo} />;
}
