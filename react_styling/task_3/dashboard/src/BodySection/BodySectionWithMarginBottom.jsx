import BodySection from './BodySection';

function BodySectionWithMarginBottom({
  title = '',
  children = null,
}) {
  return (
    <div className="bodySectionWithMargin mb-10">
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
