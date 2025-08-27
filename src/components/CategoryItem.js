function CategoryItem({ name, image, onClick, selected }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className={ `hover:border-4 hover:border-primaryGreen hover:shadow-md hover:shadow-primaryGreen ${selected ? "scale-95 border-4 border-primaryGreen shadow-md shadow-primaryGreen" : ""}   w-16 h-16 sm:w-20 sm:h-20 bg-white  shadow-md rounded-full overflow-hidden flex items-center justify-center `}>
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-full "
        />
      </div>
      <p className="text-sm mt-2 text-center font-medium capitalize">{name}</p>
    </div>
  );
}

export default CategoryItem;