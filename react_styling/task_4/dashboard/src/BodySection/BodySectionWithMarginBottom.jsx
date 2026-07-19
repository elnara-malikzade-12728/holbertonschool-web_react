import BodySection from './BodySection';

function BodySectionWithMarginBottom({
  title = '',
  children = null,
}) {
  return (
    <div className="bodySectionWithMargin mb-14 min-[520px]:mb-16 min-[912px]:mb-20">
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
