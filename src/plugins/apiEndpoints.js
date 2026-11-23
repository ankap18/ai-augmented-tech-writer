// Reads an OpenAPI spec at build time and publishes its operations (method,
// path, summary) as plugin global data. <EndpointTable /> uses them on the
// API reference page, so the table always matches the spec.
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import yaml from 'js-yaml';

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

export default function apiEndpointsPlugin(context, {specPath}) {
  const absPath = resolve(context.siteDir, specPath);

  return {
    name: 'api-endpoints',

    getPathsToWatch() {
      return [absPath];
    },

    async loadContent() {
      const spec = yaml.load(await readFile(absPath, 'utf8'));
      return Object.entries(spec.paths ?? {}).flatMap(([path, ops]) =>
        // Spec order. <EndpointTable /> reorders rows to match the sidebar.
        Object.keys(ops).filter((key) => METHODS.includes(key)).map((method) => ({
          method,
          path,
          summary: ops[method].summary,
        })),
      );
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({endpoints: content});
    },
  };
}
