export default function generateRandomSlug(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let slug = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    slug += characters[randomIndex];
  }
  return slug;
}
