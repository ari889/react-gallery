/**
 * internal imports
 */
import { images } from "../../App";

const AddNewImage = () => {
  /**
   *
   * @param {e} event
   *
   * This function add a new image at the last element of the images signal data properties
   */
  const addNewImage = (e) => {
    e.preventDefault();
    const newImages = e.target.files; // Get the newly uploaded images

    // Check if images.value.data is already an array, if not initialize it as an empty array
    const existingImages = Array.isArray(images.value.data)
      ? images.value.data
      : [];

    // Calculate the next available id and order values
    const maxId = Math.max(...existingImages.map((item) => item.id), 0) || 0;
    const maxOrder =
      Math.max(...existingImages.map((item) => item.order), 0) || 0;

    // Create an array to store the newly added images
    const newImagesArray = [];

    Object.keys(newImages).forEach((key) => {
      const file = newImages[key];
      if (file) {
        const originalPath = URL.createObjectURL(file);

        newImagesArray.push({
          id: maxId + parseInt(key) + 1, // Using a combination of maxId and the current key for uniqueness
          src: originalPath,
          isFeatured: existingImages.length === 0 ? true : false,
          order: maxOrder + key, // Using a combination of maxOrder and the current key for uniqueness
        });
      }
    });

    // Update the images.value with the existing and new images
    images.value = {
      ...images.value,
      data: [...existingImages, ...newImagesArray],
    };
  };
  return (
    <>
      <label className="border border-dashed  border-gray-300 aspect-square bg-gray-100 rounded-md text-center relative transition delay-75 cursor-pointer hover:bg-gray-200">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <img src="/images/up-image.png" className="mx-auto" alt="" />
          <p className="text-sm font-semibold">Add Images</p>
          <input
            type="file"
            name="file"
            className="hidden"
            accept="image/*"
            onChange={addNewImage}
            multiple
          />
        </div>
      </label>
    </>
  );
};

export default AddNewImage;
