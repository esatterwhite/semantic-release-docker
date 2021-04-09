## Changelog

## [3.0.1](https://github.com/esatterwhite/semantic-release-docker/compare/v3.0.0...v3.0.1) (2021-04-09)


### Bug Fixes

* **docker**: honor absolute paths to docker file [723257b](https://github.com/esatterwhite/semantic-release-docker/commit/723257b705e83ed8d951673e5ab5f4ef7d75b437) - Eric Satterwhite

# [3.0.0](https://github.com/esatterwhite/semantic-release-docker/compare/v2.2.0...v3.0.0) (2021-04-08)


### Chores

* **deps**: eslint-config-codedependant [dbe464e](https://github.com/esatterwhite/semantic-release-docker/commit/dbe464ebf7ca571ffe0430f67085d30a291f828d) - Eric Satterwhite
* **deps**: release-config-npm@1.0.1 [98b1a88](https://github.com/esatterwhite/semantic-release-docker/commit/98b1a880ef213abb49af9f9bd5fcff6d13729c21) - Eric Satterwhite


### Features

* **config**: allow templated build arguments [7167dcf](https://github.com/esatterwhite/semantic-release-docker/commit/7167dcf9aba8f554e2ccb9d42209fce3ec86d3e3) - Eric Satterwhite
* **config**: unnest config values from docker property [2087683](https://github.com/esatterwhite/semantic-release-docker/commit/2087683edfaf66825544ba2eb95eb8c6be533658) - Eric Satterwhite


### **BREAKING CHANGES**

* **config:** Flatten the docker config option for semantic relase into the root
config. Semantic release doesn't do a very good job of merging options
that are coming from a sharable configuration. This makes it easier to
utilize overrides when using a sharable config. Options are camel cased
using the docker root word prefix
`docker.args` -> `dockerArgs`
`docker.login` -> `dockerLogin`

# Semantic Release Docker

# [2.2.0](https://github.com/esatterwhite/semantic-release-docker/compare/v2.1.0...v2.2.0) (2020-12-21)


### Features

* **verify:** add option to opt out of docker login ([de17169](https://github.com/esatterwhite/semantic-release-docker/commit/de17169897965d197ed51b0aeff2e06d29157c99))

# [2.1.0](https://github.com/esatterwhite/semantic-release-docker/compare/v2.0.2...v2.1.0) (2020-08-06)


### Features

* **docker:** Load default build args into docker build ([0760d5e](https://github.com/esatterwhite/semantic-release-docker/commit/0760d5e73560a4bddbadb5a849f7574522c503fc))

## [2.0.2](https://github.com/esatterwhite/semantic-release-docker/compare/v2.0.1...v2.0.2) (2020-08-05)

## [2.0.1](https://github.com/esatterwhite/semantic-release-docker/compare/v2.0.0...v2.0.1) (2020-07-28)

# [2.0.0](https://github.com/esatterwhite/semantic-release-docker/compare/v1.0.1...v2.0.0) (2020-07-28)


### Features

* **pkg:** update to trigger a release ([acefb13](https://github.com/esatterwhite/semantic-release-docker/commit/acefb13697ca64723efd90ea0c7f3b5e5a8a5106))

## [1.0.1](https://github.com/esatterwhite/semantic-release-docker/compare/v1.0.0...v1.0.1) (2020-07-26)


### Bug Fixes

* **lib:** fixes a bug in build config that would miss project config ([51b60c1](https://github.com/esatterwhite/semantic-release-docker/commit/51b60c12f8954c2cb59bb78a276529acc08fb8ea))

# 1.0.0 (2020-07-24)


### Features

* **pkg:** initial implementation ([4a4dead](https://github.com/esatterwhite/semantic-release-docker/commit/4a4dead685892ecf89e900f3b6f7979c69fc440e))
