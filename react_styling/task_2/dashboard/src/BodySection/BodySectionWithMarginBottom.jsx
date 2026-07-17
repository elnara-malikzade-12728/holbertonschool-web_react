import './BodySectionWithMarginBottom.css';
import BodySection from './BodySection';

function BodySectionWithMarginBottom({
  title = '',
  children = null,
}) {
  return (
    <div className="bodySectionWithMargin">
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
