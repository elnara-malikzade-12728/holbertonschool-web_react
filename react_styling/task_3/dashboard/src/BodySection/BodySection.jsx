function BodySection({ title = '', children = null }) {
  return (
    <div className="bodySection pt-8">
      <h2 className="text-xl leading-7 font-bold">
        {title}
      </h2>

      <div className="text-base">
        {children}
      </div>
    </div>
  );
}

export default BodySection;
