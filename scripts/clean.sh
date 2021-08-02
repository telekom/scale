rimraf ./examples/*/node_modules;
rimraf ./examples/*/*.lock;
rimraf ./packages/*/yarn-error.log;
rimraf ./packages/*/node_modules;
rimraf ./packages/*/.cache;
# rimraf ./packages/*/public;
rimraf ./packages/*/static;
rimraf ./packages/*/build;
rimraf ./packages/*/dist;
rimraf ./packages/docs/stencil;
rimraf ./packages/*/tsconfig.tsbuildinfo;
# we want to keep yarn.lock to avoid mysterious compile errors with Angular deps
# rimraf ./yarn.lock;
rimraf ./node_modules;
