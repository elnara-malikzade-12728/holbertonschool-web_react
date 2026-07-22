import BodySection from './BodySection';

function BodySectionWithMarginBottom({
  title = '',
  children = null,
}) {
  return (
    <div
      className="
        bodySectionWithMargin
        mb-6
        min-[520px]:mb-8
        min-[912px]:mb-10
      "
    >
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
