function BodySection({ title = '', children = null }) {
  return (
    <section className="bodySection px-2 min-[520px]:px-4 min-[912px]:px-5">
      <h2
        className="
          mb-0
          text-[16px]
          font-bold
          min-[520px]:text-[15px]
          min-[912px]:text-[13px]
        "
      >
        {title}
      </h2>

      <div>{children}</div>
    </section>
  );
}

export default BodySection;
