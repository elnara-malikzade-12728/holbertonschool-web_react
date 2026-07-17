function BodySection({ title = '', children = null }) {
  return (
    <div className="bodySection px-4 py-2">
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default BodySection;
