import { images } from "../../App";

const Header = () => {
  /**
   *
   * @param {*} e
   *
   * this function delete your selected values from images.value.deletedItems
   */
  const handleDelete = (e) => {
    e.preventDefault();
    images.value = {
      ...images.value,
      data: images?.value?.data?.filter(
        (item) => !images.value.deletedItems.includes(item.id) // if in the images.value.deletedItems then remove it from images.value.data
      ),
      deletedItems: [], // make deletedItems array for newly deleted data
    };

    if (images?.value?.data?.length > 0) {
      // the the array has any data
      images.value.data[0].isFeatured = true; // make the first element of the images.value.data isFeatured true for the feature image
    }
  };
  return (
    <div>
      <div className="border-b border-b-gray-200 bg-gray-100 flex flex-row justify-between items-center">
        {/* selected items checkbox start */}
        {images?.value?.deletedItems.length > 0 ? (
          <div className="p-2 flex flex-row items-center">
            <input
              type="checkbox"
              className="checkbox mr-2"
              id="selected"
              defaultChecked={true}
              disabled
            />
            <label htmlFor="selected">
              {images?.value?.deletedItems.length}{" "}
              {images?.value?.deletedItems.length == 1 ? "Item" : "Items"}{" "}
              selected
            </label>
          </div>
        ) : (
          <h3 className="text-2xl font-semibold p-2">Gallery</h3>
        )}

        {/* selected items checkbox end */}

        {/* delete button start */}
        {images?.value?.deletedItems.length > 0 && (
          <button
            className=" my-2 px-4 py-2 bg-red-500 text-white rounded-md mr-2 transition delay-75 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Files
          </button>
        )}
        {/* delete button end */}
      </div>
    </div>
  );
};

export default Header;
