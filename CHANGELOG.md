# Semantic Release Docker

## [5.1.1](https://github.com/esatterwhite/semantic-release-docker/compare/v5.1.0...v5.1.1) (2025-05-24)


### Bug Fixes

* **ci**: update actions runner dependencies [1f23b01](https://github.com/esatterwhite/semantic-release-docker/commit/1f23b01b6f8ddec193eada6e9a441bba95c739dc) - Eric Satterwhite
* **plugin**: better support for multiple plugin instances [8b6621c](https://github.com/esatterwhite/semantic-release-docker/commit/8b6621c60a4ba40d16d5ed026cd49c23396c6e98) - Eric Satterwhite, closes: [#60](https://github.com/esatterwhite/semantic-release-docker/issues/60)


### Chores

* **compose**: update docker registry certs [4513f83](https://github.com/esatterwhite/semantic-release-docker/commit/4513f83a3eb9eb0bdab4e05ef132290cfccc0f8e) - Eric Satterwhite
* **deps**: object-hash@3.0.0 [e04e9d3](https://github.com/esatterwhite/semantic-release-docker/commit/e04e9d373c44c6145ebae3170d2b878dedccafc5) - Eric Satterwhite
* **deps**: stream-buffers@3.0.3 [b937a46](https://github.com/esatterwhite/semantic-release-docker/commit/b937a4693ab054d3496a6f902024cd70ff7c7543) - Eric Satterwhite

# [5.1.0](https://github.com/esatterwhite/semantic-release-docker/compare/v5.0.4...v5.1.0) (2024-12-30)


### Chores

* **deps**: actions/core@1.11.1 [dd03ed4](https://github.com/esatterwhite/semantic-release-docker/commit/dd03ed4c4e9624e578b7f9b35e370c32463810f5) - Eric Satterwhite


### Features

* **plugin**: add basic support for github actions [01085f6](https://github.com/esatterwhite/semantic-release-docker/commit/01085f68ffba854f1a4923879d9dfcfdf589eaf0) - Eric Satterwhite, closes: [#49](https://github.com/esatterwhite/semantic-release-docker/issues/49)

## [5.0.4](https://github.com/esatterwhite/semantic-release-docker/compare/v5.0.3...v5.0.4) (2024-12-23)


### Continuous Integration

* fix test [a4b886c](https://github.com/esatterwhite/semantic-release-docker/commit/a4b886cbfdbe200970210aed6633363de44bab28) - Eric Satterwhite

## [5.0.3](https://github.com/esatterwhite/semantic-release-docker/compare/v5.0.2...v5.0.3) (2024-03-25)


### Bug Fixes

* **verify**: fix logic around the conditional prepare step [ae8335a](https://github.com/esatterwhite/semantic-release-docker/commit/ae8335a654bf844c3186a7d24ec068f03ced3fe5) - Eric Satterwhite

## [5.0.2](https://github.com/esatterwhite/semantic-release-docker/compare/v5.0.1...v5.0.2) (2024-03-22)


### Bug Fixes

* **config**: propgate dry run option to docker image [1438ded](https://github.com/esatterwhite/semantic-release-docker/commit/1438dedae17c45eeb88f17b6108d343de283f10f) - Eric Satterwhite

## [5.0.1](https://github.com/esatterwhite/semantic-release-docker/compare/v5.0.0...v5.0.1) (2024-03-22)


### Bug Fixes

* **config**: include the dry-run param from input options [2de549f](https://github.com/esatterwhite/semantic-release-docker/commit/2de549f8dc2dcdc9741c06959ce0d120dd8b5fc5) - Eric Satterwhite

# [5.0.0](https://github.com/esatterwhite/semantic-release-docker/compare/v4.5.1...v5.0.0) (2024-03-22)


### Chores

* **compose**: update test registry certs [fa8d771](https://github.com/esatterwhite/semantic-release-docker/commit/fa8d771f8f3381e3b2327a29ab10bb27b1257d1e) - Eric Satterwhite


### Features

* **docker**: include support for buildx [ccf9954](https://github.com/esatterwhite/semantic-release-docker/commit/ccf9954fdbad0c25c4ce7b8afcf7730b9652fe76) - Eric Satterwhite, closes: [#44](https://github.com/esatterwhite/semantic-release-docker/issues/44) [#39](https://github.com/esatterwhite/semantic-release-docker/issues/39)


### Miscellaneous

* **README.md**: fix typo in README.md [700e2f0](https://github.com/esatterwhite/semantic-release-docker/commit/700e2f0543a1fbd7d59b6ead84870bc8c5cfc3b3) - Eric Satterwhite


### **BREAKING CHANGES**

* **docker:** images built with buildx will not be stored locally
* **docker:** dockerVerifyCmd will only take effect during dry runs (--dry-run)

## [4.5.1](https://github.com/esatterwhite/semantic-release-docker/compare/v4.5.0...v4.5.1) (2024-02-04)


### Bug Fixes

* **image**: account for stderr when looking for an image sha [ba9eec2](https://github.com/esatterwhite/semantic-release-docker/commit/ba9eec2888fb4478a3a90f741de41a155b6c525e) - Eric Satterwhite, closes: [#46](https://github.com/esatterwhite/semantic-release-docker/issues/46)

# [4.5.0](https://github.com/esatterwhite/semantic-release-docker/compare/v4.4.0...v4.5.0) (2023-10-20)


### Features

* **config**: allow --quiet flag to be configurable [7abc74e](https://github.com/esatterwhite/semantic-release-docker/commit/7abc74ecdd96baa8d27ecb177defc137a64b482f) - Eric Satterwhite, closes: [#40](https://github.com/esatterwhite/semantic-release-docker/issues/40)

# [4.4.0](https://github.com/esatterwhite/semantic-release-docker/compare/v4.3.0...v4.4.0) (2023-07-11)


### Features

* **image**: add support for cache-from build flag [efae32d](https://github.com/esatterwhite/semantic-release-docker/commit/efae32d760bc0ef1978ad97f834b4cb034199ace) - Eric Satterwhite, closes: [#35](https://github.com/esatterwhite/semantic-release-docker/issues/35)
* **image**: support arbitrary build flags [d7e875d](https://github.com/esatterwhite/semantic-release-docker/commit/d7e875d2b0b8de58e57c56e9ba24bf3c2db5df84) - Eric Satterwhite

# [4.3.0](https://github.com/esatterwhite/semantic-release-docker/compare/v4.2.0...v4.3.0) (2022-12-29)


### Features

* **config**: add option to disable post publish image removal [0c03cbd](https://github.com/esatterwhite/semantic-release-docker/commit/0c03cbd16bf7aa34cb435e3782492ad294e9bdfd) - Eric Satterwhite, closes: [#28](https://github.com/esatterwhite/semantic-release-docker/issues/28)

# [4.2.0](https://github.com/esatterwhite/semantic-release-docker/compare/v4.1.0...v4.2.0) (2022-12-19)


### Chores

* **ci**: downgrade github actions runner version [c6f1935](https://github.com/esatterwhite/semantic-release-docker/commit/c6f1935aec63e21a85c8e513dd74fed29a84562b) - Eric Satterwhite
* **test**: regenerate the local docker registry certs [4cfa6e2](https://github.com/esatterwhite/semantic-release-docker/commit/4cfa6e2a912b69ff3cfc496b88dae449a982e5f4) - Eric Satterwhite
* **test**: remove ci test temporarily [c28f199](https://github.com/esatterwhite/semantic-release-docker/commit/c28f199ab3d2e9bb85846e562c936c782f9440a5) - Eric Satterwhite


### Documentation

* fix broken table in  readme [e85e6f3](https://github.com/esatterwhite/semantic-release-docker/commit/e85e6f38f48e3c11ef88953e0cfa74276aab09a6) - Eric Satterwhite


### Features

* added dockerNetwork config option [d6f2def](https://github.com/esatterwhite/semantic-release-docker/commit/d6f2defa0a4cfa3a36b1b63e7cdfe13c700e632a) - Eric Satterwhite, closes: [#29](https://github.com/esatterwhite/semantic-release-docker/issues/29)

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
