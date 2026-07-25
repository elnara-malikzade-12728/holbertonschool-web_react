function BodySection({ title = '', children = null }) {
  return (
    <section
      className="
        bodySection
        px-0
        py-2
        min-[520px]:px-2
        min-[912px]:px-9
      "
    >
      <h2
        className="
          mb-2
          text-sm
          font-bold
          min-[520px]:text-base
          min-[912px]:text-[8px]
        "
      >
        {title}
      </h2>

      <div>
        {children}
      </div>
    </section>
  );
}

export default BodySection;
