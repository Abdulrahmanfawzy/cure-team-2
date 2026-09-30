export const getImageUrl = (image: string) => {
    if (image.startsWith("https")) {
    return image;
  }
  return `${import.meta.env.VITE_STORAGE_URL}/${image}`;
};