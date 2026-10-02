function BodySection({ title = '', children = null }) {
  return (
    <section
      className="bodySection pt-8 min-[912px]:pt-8"
    >
      <h2
        className="text-lg leading-7 font-bold min-[912px]:text-xl min-[912px]:leading-7"
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
