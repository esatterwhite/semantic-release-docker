# Semantic Release Docker

# [4.1.0](https://github.com/esatterwhite/semantic-release-docker/compare/v4.0.0...v4.1.0) (2022-04-10)


### Chores

* **deps**: semantic-release/error@3.0.0 [d55ff11](https://github.com/esatterwhite/semantic-release-docker/commit/d55ff1108a0130ce10932e409683fb741fb315d3) - Eric Satterwhite
* **deps**: tap@16.0.0 [94d3340](https://github.com/esatterwhite/semantic-release-docker/commit/94d3340dba42ed702b71325ea5afc2f627df1fcc) - Eric Satterwhite


### Features

* **docker**: allow command to be run via docker in verify step [4646bd6](https://github.com/esatterwhite/semantic-release-docker/commit/4646bd681cb4d7ee4a48a9187fbe7dfe88686b78) - Eric Satterwhite, closes: [#20](https://github.com/esatterwhite/semantic-release-docker/issues/20)


### Miscellaneous

* add prerelease example [90158fd](https://github.com/esatterwhite/semantic-release-docker/commit/90158fdaa65b35a861ce40ca2c3a660f28446f72) - Eric Satterwhite
* Update Readme [74f9910](https://github.com/esatterwhite/semantic-release-docker/commit/74f99107723223a67009c96a762b200f8d25621d) - GitHub

# [4.0.0](https://github.com/esatterwhite/semantic-release-docker/compare/v3.1.2...v4.0.0) (2021-12-31)


### Chores

* **deps**: @codedependant/release-config-npm@1.0.4 [fdb0985](https://github.com/esatterwhite/semantic-release-docker/commit/fdb0985d346b1f74d61cf4d0ef238743e5f1d6f4) - Eric Satterwhite
* **deps**: eslint-config-codedependant@3.0.0 [6807acc](https://github.com/esatterwhite/semantic-release-docker/commit/6807accd81002e7bc86d79f260c19141f40363f6) - Eric Satterwhite
* **deps**: eslint@8.5.0 [f7e0bbe](https://github.com/esatterwhite/semantic-release-docker/commit/f7e0bbeb67156dedb0b3a8a2d0bad0d8828c7dde) - Eric Satterwhite


### Features

* **template**: replace simple template engine with handlebars [b20c89c](https://github.com/esatterwhite/semantic-release-docker/commit/b20c89ca979de7969028541b6a29ac9b867a06c3) - Eric Satterwhite, closes: [#16](https://github.com/esatterwhite/semantic-release-docker/issues/16)


### Miscellaneous

* fix typo [3aa33ba](https://github.com/esatterwhite/semantic-release-docker/commit/3aa33ba2fc003a9f88e6b1d4263999152a577eda) - Eric Satterwhite


### **BREAKING CHANGES**

* **template:** Use handlebars as template engine. Place holders are
now double curlies `{{ }}`

## [3.1.2](https://github.com/esatterwhite/semantic-release-docker/compare/v3.1.1...v3.1.2) (2021-09-18)


### Bug Fixes

* **config**: ensure the docker context is passed image builds [366b8d1](https://github.com/esatterwhite/semantic-release-docker/commit/366b8d1d1f90855a76cfdb78009ec4510ead769e) - Eric Satterwhite, closes: [#13](https://github.com/esatterwhite/semantic-release-docker/issues/13)

## [3.1.1](https://github.com/esatterwhite/semantic-release-docker/compare/v3.1.0...v3.1.1) (2021-09-18)


### Documentation

* corrected the parameter - dockerFile [81e9319](https://github.com/esatterwhite/semantic-release-docker/commit/81e9319e7dae9905cf098a5b2c3a9837d4f5d1d9) - Eric Satterwhite

# [3.1.0](https://github.com/esatterwhite/semantic-release-docker/compare/v3.0.1...v3.1.0) (2021-04-12)


### Features

* **lib**: parse tags array from string [27d078b](https://github.com/esatterwhite/semantic-release-docker/commit/27d078b2bbd1f8881f2a4c390b50ac6d384e40f4) - Eric Satterwhite

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
