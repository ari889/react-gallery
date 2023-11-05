/**
 * external imports
 */
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";

/**
 * internal imports
 */
import { images } from "../../App";

const GalleryImage = ({ item }) => {
  const { id, src, isFeatured, order } = item; // destructuring object

  /**
   *
   * @param {*} id
   * this function get all id from selected checked images and push it to the global signal state
   */
  const handleChecked = (e) => {
    if (e?.target?.checked) {
      // if the checkbox is checked then add the id of the element at the images.value.deletedItems
      images.value = {
        ...images?.value,
        deletedItems: [...images.value.deletedItems, parseInt(e.target.value)],
      };
    } else {
      // if the checkbox isn't checked then remove the id of the element if exists in the images.value.deletedItems
      images.value = {
        ...images?.value,
        deletedItems: images?.value?.deletedItems?.filter(
          // this function remove the id which I unchecked
          (item) => item !== parseInt(e.target.value)
        ),
      };
    }
  };

  /**
   * when I start drag this hook will be fired with type IMAGE which contains image id and order
   */
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE", // set drag type
    item: { id, order }, // when I drag then send the id and image as parameter
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // monitor am I drag it or not
    }),
  });

  /**
   * this function will be fired when I drop type IMAGE in a certain element
   */
  const [{ isOver }, drop] = useDrop({
    accept: "IMAGE",
    drop: (draggedItem) => {
      // if I hover on the dropped element then fire a function which updated the images.value.data array
      if (draggedItem.order !== order) {
        // if the dropped order and image order will not be same then the function will be fired
        moveImage(draggedItem.order, order);
        draggedItem.order = order; // set the drag item order
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // set is over true if hover on the dropped item
    }),
  });

  /**
   *
   * @param {*} from
   * @param {*} to
   *
   * This function change the order of the images which contains on the array of the images.value.data
   */
  const moveImage = (from, to) => {
    const { data } = images.value; // destructure data as array
    const fromIndex = data.findIndex((image) => image.order === from); // find the array which has order from
    const toIndex = data.findIndex((image) => image.order === to); // find the array which has order to

    if (fromIndex !== -1 && toIndex !== -1) {
      // if the fromIndex and toIndex are esists then action occured
      const updatedData = [...data]; // destructure the data element
      const [movedImage] = updatedData.splice(fromIndex, 1); // delete the from index order
      updatedData.splice(toIndex, 0, movedImage); // insert the data at the to index

      // Update order values
      updatedData.forEach((image, index) => {
        image.order = index + 1; // update each element order value
        if (index === 0) {
          // if the element of the index is 0 then make it featured
          image.isFeatured = true;
        } else {
          // make other element as not featured
          image.isFeatured = false;
        }
      });

      images.value = { ...images?.value, data: updatedData }; // update signal
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`${
        isFeatured && `row-span-2 col-span-2`
      } border rounded-md overflow-hidden relative group aspect-square ${
        isOver && `bg-gray-100`
      } ${isDragging && `opacity-50`}`}
    >
      {isOver ? (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300">
          {/* Show this text if I hover on this item */}
          Drop Here
        </p>
      ) : (
        <motion.div whileDrag={{ scale: 1.2 }} layout>
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-ful bg-gray-900/0 group-hover:bg-gray-900/30 z-9 transition-all delay-75 duration-75"></div>
          <input
            type="checkbox"
            className="checkbox mr-2 absolute top-3 left-3 z-10 bg-white"
            value={id}
            id="selected"
            defaultChecked={images?.value?.deletedItems?.includes(id)}
            onChange={handleChecked}
          />
          <img src={src} className="w-full" alt="" />
        </motion.div>
      )}
    </div>
  );
};

export default GalleryImage;
