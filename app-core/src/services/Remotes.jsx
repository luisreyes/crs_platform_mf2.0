import { init, loadRemote } from '@module-federation/enhanced/runtime';
import { lazy } from 'react';
const initRemotes = (remotes) => {
  init({
    name: 'dynamic_remotes',
    remotes: [...remotes],
  });
};

const useRemote = (scope, module) => {
  const remoteName = `${scope}/${module}`;
  return lazy(() =>
    loadRemote(remoteName).then((remote) => {
      return remote;
    }),
  );
};

export default {
  initRemotes,
  useRemote,
};
