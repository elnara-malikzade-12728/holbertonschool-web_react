import BodySection from './BodySection';

function BodySectionWithMarginBottom({
  title = '',
  children = null,
}) {
  return (
    <div
      className="bodySectionWithMargin mb-3 min-[912px]:mb-0"
    >
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
