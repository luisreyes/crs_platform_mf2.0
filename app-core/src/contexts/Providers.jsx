import React from 'react';

// TODO: This code could potentially be improved and optimized
const WrappedProviders =
  (providers) =>
  ({ children }) => {
    const lastIndex = providers.length - 1;
    let activeChildren = children;

    for (let i = lastIndex; i >= 0; i--) {
      const [Provider, props] = providers[i];
      activeChildren = <Provider {...(props || {})}>{activeChildren}</Provider>;
    }

    return activeChildren;
  };

const Providers = ({ providers, children }) => {
  const Wrapped = WrappedProviders(providers);
  Wrapped.displayName = 'WrappedProviders';
  return <Wrapped>{children}</Wrapped>;
};

export default Providers;
