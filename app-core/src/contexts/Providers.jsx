import React from 'react';

const Providers = ({ providers, children }) => {
  // Compose the providers in reverse order, wrapping the children with each provider.
  return providers.reduceRight((acc, [Provider, props]) => {
    return <Provider {...(props || {})}>{acc}</Provider>;
  }, children);
};

export default Providers;