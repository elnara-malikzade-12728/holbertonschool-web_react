function BodySection({ title = '', children = null }) {
  return (
    <div className="bodySection px-[20px] py-[10px]">
      <h2 className="mb-[0px] text-[10px] font-bold">
        {title}
      </h2>

      <div className="text-[10px] mb-[100px]">
        {children}
      </div>
    </div>
  );
}

export default BodySection;
