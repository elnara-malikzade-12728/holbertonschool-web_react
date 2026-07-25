import { Component } from 'react';

function WithLogging(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  class WithLoggingComponent extends Component {
    componentDidMount() {
      globalThis.console.log(`Component ${componentName} is mounted`);
    }

    componentWillUnmount() {
      globalThis.console.log(
        `Component ${componentName} is going to unmount`
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${componentName})`;

  return WithLoggingComponent;
}

export default WithLogging;
