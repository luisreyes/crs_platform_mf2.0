import {
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import { ErrorBoundary } from "react-error-boundary";

import { lazy } from 'react';

const useRemote = (scope, module, port) => {
  const remoteName = `${scope}/${module}`;
  const RemoteComponent = lazy(async () => {
    registerRemotes([
      {
        name: scope,
        entry: `http://localhost:${port}/mf-manifest.json`,
      },
    ]);
    return loadRemote(remoteName, {from: 'runtime'}).then((remote) => {
      return remote;
    });
  });

  return () => <ErrorBoundary fallback={<>Error Loading Remote: {scope}</>}><RemoteComponent/></ErrorBoundary>;
};

export default useRemote;
