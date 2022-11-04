# Semantic Release Docker

# 1.0.0 (2022-11-04)


### Bug Fixes

* **config**: ensure the docker context is passed image builds [366b8d1](https://github.com/sambunting/semantic-release-docker/commit/366b8d1d1f90855a76cfdb78009ec4510ead769e) - Eric Satterwhite, closes: [#13](https://github.com/sambunting/semantic-release-docker/issues/13)
* **docker**: honor absolute paths to docker file [723257b](https://github.com/sambunting/semantic-release-docker/commit/723257b705e83ed8d951673e5ab5f4ef7d75b437) - Eric Satterwhite
* **lib**: fixes a bug in build config that would miss project config [51b60c1](https://github.com/sambunting/semantic-release-docker/commit/51b60c12f8954c2cb59bb78a276529acc08fb8ea) - Eric Satterwhite


### Chores

* updated package name [b4ac18b](https://github.com/sambunting/semantic-release-docker/commit/b4ac18ba48e71c47cb7541d1864b41053b5b1ad2) - Sam Bunting
* updated repository url [b778a64](https://github.com/sambunting/semantic-release-docker/commit/b778a643e9629cec188142e75dd90ad3f2c87fa1) - Sam Bunting
* **deps**: @codedependant/release-config-npm@1.0.4 [fdb0985](https://github.com/sambunting/semantic-release-docker/commit/fdb0985d346b1f74d61cf4d0ef238743e5f1d6f4) - Eric Satterwhite
* **deps**: eslint-config-codedependant [dbe464e](https://github.com/sambunting/semantic-release-docker/commit/dbe464ebf7ca571ffe0430f67085d30a291f828d) - Eric Satterwhite
* **deps**: eslint-config-codedependant@3.0.0 [6807acc](https://github.com/sambunting/semantic-release-docker/commit/6807accd81002e7bc86d79f260c19141f40363f6) - Eric Satterwhite
* **deps**: eslint@8.5.0 [f7e0bbe](https://github.com/sambunting/semantic-release-docker/commit/f7e0bbeb67156dedb0b3a8a2d0bad0d8828c7dde) - Eric Satterwhite
* **deps**: release-config-npm@1.0.1 [98b1a88](https://github.com/sambunting/semantic-release-docker/commit/98b1a880ef213abb49af9f9bd5fcff6d13729c21) - Eric Satterwhite
* **deps**: semantic-release/error@3.0.0 [d55ff11](https://github.com/sambunting/semantic-release-docker/commit/d55ff1108a0130ce10932e409683fb741fb315d3) - Eric Satterwhite
* **deps**: tap@16.0.0 [94d3340](https://github.com/sambunting/semantic-release-docker/commit/94d3340dba42ed702b71325ea5afc2f627df1fcc) - Eric Satterwhite
* **release**: 1.0.0 [skip ci] [dfcc48a](https://github.com/sambunting/semantic-release-docker/commit/dfcc48a2c2c3b1bc6955126f86f2d69e3093be1b) - Dependant Bot
* **release**: 1.0.1 [skip ci] [2e7fea9](https://github.com/sambunting/semantic-release-docker/commit/2e7fea923d9eae253ed41833fd8d873ea6882df1) - Dependant Bot
* **release**: 2.0.0 [skip ci] [374947a](https://github.com/sambunting/semantic-release-docker/commit/374947a143315a2d4047c069862a469fe4fa4a7e) - Dependant Bot
* **release**: 2.0.1 [skip ci] [a5c11fc](https://github.com/sambunting/semantic-release-docker/commit/a5c11fc5bf8508620e54fa6db1f626bb0e10d7c0) - Dependant Bot
* **release**: 2.0.2 [skip ci] [0140d66](https://github.com/sambunting/semantic-release-docker/commit/0140d66e5c954f2d5e8c1ac941d39b027838f35a) - Dependant Bot
* **release**: 2.1.0 [skip ci] [0764212](https://github.com/sambunting/semantic-release-docker/commit/0764212a2e2aa9b6a8909b2add6c67e023f3bbce) - Dependant Bot
* **release**: 2.2.0 [skip ci] [e157d3f](https://github.com/sambunting/semantic-release-docker/commit/e157d3fc9a5316c6d70d08a9d46aa53589321e7e) - Dependant Bot
* **verify**: add debug output during verify steps [82d1c5e](https://github.com/sambunting/semantic-release-docker/commit/82d1c5e51fd7dc153ee5a434bb61cb9ad89cb747) - Eric Satterwhite


### Documentation

* corrected the parameter - dockerFile [81e9319](https://github.com/sambunting/semantic-release-docker/commit/81e9319e7dae9905cf098a5b2c3a9837d4f5d1d9) - Eric Satterwhite
* **README**: Fix a few typos [0806454](https://github.com/sambunting/semantic-release-docker/commit/08064544cdb7284e312a146c9e1a5b81b1d35335) - Eric Satterwhite


### Features

* added dockerNetwork config option [ee570df](https://github.com/sambunting/semantic-release-docker/commit/ee570dfe3d9898fbd478f696fb4b2776d904a0d0) - Sam Bunting
* **config**: allow templated build arguments [7167dcf](https://github.com/sambunting/semantic-release-docker/commit/7167dcf9aba8f554e2ccb9d42209fce3ec86d3e3) - Eric Satterwhite
* **config**: unnest config values from docker property [2087683](https://github.com/sambunting/semantic-release-docker/commit/2087683edfaf66825544ba2eb95eb8c6be533658) - Eric Satterwhite
* **docker**: allow command to be run via docker in verify step [4646bd6](https://github.com/sambunting/semantic-release-docker/commit/4646bd681cb4d7ee4a48a9187fbe7dfe88686b78) - Eric Satterwhite, closes: [#20](https://github.com/sambunting/semantic-release-docker/issues/20)
* **docker**: Load default build args into docker build [0760d5e](https://github.com/sambunting/semantic-release-docker/commit/0760d5e73560a4bddbadb5a849f7574522c503fc) - Eric Satterwhite
* **lib**: parse tags array from string [27d078b](https://github.com/sambunting/semantic-release-docker/commit/27d078b2bbd1f8881f2a4c390b50ac6d384e40f4) - Eric Satterwhite
* **pkg**: initial implementation [4a4dead](https://github.com/sambunting/semantic-release-docker/commit/4a4dead685892ecf89e900f3b6f7979c69fc440e) - Eric Satterwhite
* **pkg**: update to trigger a release [acefb13](https://github.com/sambunting/semantic-release-docker/commit/acefb13697ca64723efd90ea0c7f3b5e5a8a5106) - Eric Satterwhite
* **template**: replace simple template engine with handlebars [b20c89c](https://github.com/sambunting/semantic-release-docker/commit/b20c89ca979de7969028541b6a29ac9b867a06c3) - Eric Satterwhite, closes: [#16](https://github.com/sambunting/semantic-release-docker/issues/16)
* **verify**: add option to opt out of docker login [de17169](https://github.com/sambunting/semantic-release-docker/commit/de17169897965d197ed51b0aeff2e06d29157c99) - Eric Satterwhite


### Miscellaneous

* 2021-04-09, Version 3.0.1 [skip ci] [07f2063](https://github.com/sambunting/semantic-release-docker/commit/07f20635ad5510127ec00b7cc4d4fde86d361357) - Dependant Bot
* 2021-09-18, Version 3.1.1 [skip ci] [4909d4e](https://github.com/sambunting/semantic-release-docker/commit/4909d4ed2f2b6daa931bb4b6bba0338c42da73cf) - Dependant Bot
* 2022-04-10, Version 4.1.0 [skip ci] [91e8c8e](https://github.com/sambunting/semantic-release-docker/commit/91e8c8e7ae750076ea2489716dfa405546cd3291) - Dependant Bot
* add prerelease example [90158fd](https://github.com/sambunting/semantic-release-docker/commit/90158fdaa65b35a861ce40ca2c3a660f28446f72) - Eric Satterwhite
* Update Readme [74f9910](https://github.com/sambunting/semantic-release-docker/commit/74f99107723223a67009c96a762b200f8d25621d) - GitHub
* 2021-04-08, Version 3.0.0 [skip ci] [0d7d763](https://github.com/sambunting/semantic-release-docker/commit/0d7d76333e597c5df907e9f49b1bd964e0060d30) - Dependant Bot
* 2021-04-12, Version 3.1.0 [skip ci] [30c2d67](https://github.com/sambunting/semantic-release-docker/commit/30c2d67d68dce910a49aad83804f03f91dba97ed) - Dependant Bot
* 2021-09-18, Version 3.1.2 [skip ci] [ec4df6a](https://github.com/sambunting/semantic-release-docker/commit/ec4df6ab30565bdbaff030452e470d06a6a3facf) - Dependant Bot
* 2021-12-31, Version 4.0.0 [skip ci] [4d7a59b](https://github.com/sambunting/semantic-release-docker/commit/4d7a59bdde448ed23b0b09ecf8cbbe596d27528f) - Dependant Bot
* debug@4.1.1 [1c0014a](https://github.com/sambunting/semantic-release-docker/commit/1c0014a0fe9bfcec8174a7e8f3fa7aeead50f1fd) - Eric Satterwhite
* fix typo [3aa33ba](https://github.com/sambunting/semantic-release-docker/commit/3aa33ba2fc003a9f88e6b1d4263999152a577eda) - Eric Satterwhite
* scope the config options under `docker` [41681e7](https://github.com/sambunting/semantic-release-docker/commit/41681e790534fbd30be7a1968e9a285001159bba) - Eric Satterwhite
* Initial commit [7122375](https://github.com/sambunting/semantic-release-docker/commit/71223752d1e36d14649b1a942ede4143bc53044e) - GitHub


### Tests

* fixed package name [ccdad1b](https://github.com/sambunting/semantic-release-docker/commit/ccdad1ba48918562a64a808fada5792af07419f1) - Sam Bunting


### **BREAKING CHANGES**

* **template:** Use handlebars as template engine. Place holders are
now double curlies `{{ }}`
* **config:** Flatten the docker config option for semantic relase into the root
config. Semantic release doesn't do a very good job of merging options
that are coming from a sharable configuration. This makes it easier to
utilize overrides when using a sharable config. Options are camel cased
using the docker root word prefix
`docker.args` -> `dockerArgs`
`docker.login` -> `dockerLogin`
* **pkg:** tripping a release

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
