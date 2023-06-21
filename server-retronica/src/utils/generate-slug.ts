// import shortid from 'shortid';
import slugify from 'slugify';

export function generateSlug(title: string): string {
  const slug = slugify(title, { lower: true });
  return slug;
}

// export function generateSlug(title: string): string {
//   const slug = slugify(title, { lower: true }) + '-' + shortid.generate();
//   return slug;
// }

// export const generateSlug = (str: string): string => {
//   const url: string = str
//     .replace(/[\s]+/gi, '-')
//     .replace(/[^0-9a-z_\-]+/gi, '')
//     .replace('---', '-')
//     .replace('--', '-')
//     .toLowerCase();
//   return url;
// };
