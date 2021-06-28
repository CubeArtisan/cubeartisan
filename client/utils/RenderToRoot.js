import ReactDOM from 'react-dom';

import ErrorBoundary from '@hypercube/client/components/ErrorBoundary';
import SiteCustomizationContext from '@hypercube/client/contexts/SiteCustomizationContext';
import UserContext from '@hypercube/client/contexts/UserContext';

const RenderToRoot = (Element) => {
  const reactProps = typeof window !== 'undefined' ? window.reactProps : {};
  const element = (
    <ErrorBoundary className="mt-3">
      <SiteCustomizationContext.Provider value={reactProps ? reactProps.siteCustomizations : null}>
        <UserContext.Provider value={reactProps ? reactProps.user : null}>
          <Element {...reactProps} />
        </UserContext.Provider>
      </SiteCustomizationContext.Provider>
    </ErrorBoundary>
  );
  if (typeof document !== 'undefined') {
    const wrapper = document.getElementById('react-root');
    if (wrapper) {
      if (wrapper.children.length === 0) {
        ReactDOM.render(element, wrapper);
      } else {
        ReactDOM.hydrate(element, wrapper);
      }
    }
  }

  return Element;
};

export default RenderToRoot;
