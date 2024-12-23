# @codedependant/semantic-release-docker

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![MIT license](https://img.shields.io/npm/l/@codedependant/semantic-release-docker.svg)](https://www.npmjs.com/package/@codedependant/semantic-release-docker)

A [semantic-release](https://github.com/semantic-release/semantic-release) plugin to use semantic versioning for docker images.

## Supported Steps

### verifyConditions

verifies that environment variables for authentication via username and password are set.
It uses a registry server provided via config or environment variable (preferred) or defaults to docker hub if none is given.
It also verifies that the credentials are correct by logging in to the given registry.

### prepare

builds a an image using the specified docker file and context. This image will be used to create tags in later steps

### publish

pushes the tags Images with specified tags and pushes them to the registry.
Tags support simple templating via [handlebars][]. Values enclosed in braces `{{}}` will be substituted with release context information

## Installation

Run `npm i --save-dev @codedependant/semantic-release-docker` to install this semantic-release plugin.

## Configuration

### Docker registry authentication

Authentication to a `docker registry` is set via environment variables. It is not required, and if
omitted, it is assumed the docker daemon is already authenticated with the target registry.

### Environment variables

| Variable                 | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| DOCKER_REGISTRY_USER     | The user name to authenticate with at the registry.                                       |
| DOCKER_REGISTRY_PASSWORD | The password used for authentication at the registry.                                     |

### Options

| Option                 | Description                                                                                                                                                            | Type                                          | Default                                                       |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|---------------------------------------------------------------|
| `dockerTags`           | _Optional_. An array of strings allowing to specify additional tags to apply to the image. Supports templating                                                         | [Array][]&lt;[String][]&gt;                   | [`latest`, `{{major}}-latest`, `{{version}}`]                 |
| `dockerImage`          | _Optional_. The name of the image to release.                                                                                                                          | [String][]                                    | Parsed from package.json `name` property                      |
| `dockerRegistry`       | _Optional_. The hostname and port used by the the registry in format `hostname[:port]`. Omit the port if the registry uses the default port                            | [String][]                                    | `null` (dockerhub)                                            |
| `dockerProject`        | _Optional_. The project or repository name to publish the image to                                                                                                     | [String][]                                    | For scoped packages, the scope will be used, otherwise `null` |
| `dockerPlatform`       | _Optional_. A list of target platofmrs to build for. If specified, [buildx][] Will be used to generate the final images                                                | [Array][]&lt;[String][]&gt;                   | `null` (default docker build behavior)                        |
| `dockerFile`           | _Optional_. The path, relative to `$PWD` to a Docker file to build the target image with                                                                               | [String][]                                    | `Dockerfile`                                                  |
| `dockerContext`        | _Optional_. A path, relative to `$PWD` to use as the build context A                                                                                                   | [String][]                                    | `.`                                                           |
| `dockerLogin`          | _Optional_. Set to false it by pass docker login if the docker daemon is already authorized                                                                            | [String][]                                    | `true`                                                        |
| `dockerArgs`           | _Optional_. Include additional values for docker's `build-arg`. Supports templating                                                                                    | [Object][]                                    |                                                               |
| `dockerPublish`        | _Optional_. Automatically push image tags during the publish phase.                                                                                                    | [Boolean][]                                   | `true`                                                        |
| `dockerVerifyCmd`      | _Optional_. If specified, during the verify stage, the specified command will execute in a container of the build image. If the command errors, the release will fail. | [String][]                                    | `false`                                                       |
| `dockerNetwork`        | _Optional_. Specify the Docker network to use while the image is building.                                                                                             | [String][]                                    | `default`                                                     |
| `dockerAutoClean`      | _Optional_. If set to true                                                                                                                                             | [Boolean][]                                   | `true`                                                        |
| `dockerBuildFlags`     | _Optional_. An object containing additional flags to the `docker build` command. Values can be strings or an array of strings                                          | [Object][]                                    | `{}`                                                          |
| `dockerBuildCacheFrom` | _Optional_. A list of external cache sources. See [--cache-from][]                                                                                                     | [String][] &#124; [Array][]&lt;[String][]&gt; |                                                               |


### BuildX Support

Version 5.X includes initial and experimental support for multi-platform images via the [buildx][] plugin.
This plugin assumes that the docker daemon and buildx have already been setup correctly.
Platform specific builder must be setup and selected for this plugin to utilize [buildx][]

> [!WARNING]
>
> When using buildx via the dockerPlatform option, images are not kept locally
> and normal docker commands targeting those images will not work.
> The `dockerVerifyCmd` behavior will only trigger a build and is unable to execute local command

### Build Arguments

By default several build arguments will be included when the docker images is being built.
Build arguments can be templated in the same fashion as docker tags. If the value for a
build argument is explicitly `true`, the value will be omitted and the value from
a matching environment variable will be utilized instead. This can be useful when trying to include
secrets and other sensitive information

| Argument Name       | Description                                                                               | Default                      |
|---------------------|-------------------------------------------------------------------------------------------|------------------------------|
| `SRC_DIRECTORY`     | The of the directory the build was triggered from                                         | The directory name of CWD    |
| `TARGET_PATH`       | Path relative to the execution root. Useful for Sharing a Single Docker file in monorepos |                              |
| `NPM_PACKAGE_NAME`  | The `name` property extracted from `package.json` - if present                            |                              |
| `NPM_PACKAGE_SCOPE` | The parsed scope from the `name` property from `package.json` - sans `@`                  |                              |
| `CONFIG_NAME`       | The configured name of the docker image.                                                  | The parsed package name      |
| `CONFIG_PROJECT`    | The configured docker repo project name                                                   | The package scope if present |
| `GIT_SHA`           | The commit SHA of the current release                                                     |                              |
| `GIT_TAG`           | The git tag of the current release                                                        |                              |

### Template Variables

String template will be passed these

| Variable name  | Description                                                        | Type                        |
|----------------|--------------------------------------------------------------------|-----------------------------|
| `git_sha`      | The commit SHA of the current release                              | [String][]                  |
| `git_tag`      | The git tag of the current release                                 | [String][]                  |
| `release_type` | The severity type of the current build (`major`, `minor`, `patch`) | [String][]                  |
| `release_notes`| The release notes blob associated with the release                 | [String][]                  |
| `next`         | Semver object representing the next release                        | [Object][]                  |
| `previous`     | Semver object representing the previous release                    | [Object][]                  |
| `major`        | The major version of the next release                              | [Number][]                  |
| `minor`        | The minor version of the next release                              | [Number][]                  |
| `patch`        | The patch version of the next release                              | [Number][]                  |
| `prerelease`   | The prerelease versions of the next release                        | [Array][]&lt;[Number][]&gt; |
| `env`          | Environment variables that were set at build time                  | [Object][]                  |
| `pkg`          | Values parsed from `package.json`                                  | [Object][]                  |
| `build`        | A Random build hash representing the current execution context     | [String][]                  |
| `now`          | Current timestamp is ISO 8601 format                               | [String][]                  |

### Template Helpers

The following handlebars template helpers are pre installed

|  Helper name | Description                                                            | Return Type | Example                                                                                    |
|:------------:|------------------------------------------------------------------------|:-----------:|--------------------------------------------------------------------------------------------|
|  `endswith`  | returns true if a string ends with another                             | [Boolean][] | <pre lang="hbs">{{#if (endswith myvar 'ing')}}{{ othervar }}{{/if}}</pre>                  |
|     `eq`     | returns true if two values are strictly equal to each other            | [Boolean][] | <pre lang="hbs">{{#if (eq var_one var_two)}}{{ var_three }}{{/if}}</pre>                   |
|     `gt`     | returns true if the first value is greater than the second             | [Boolean][] | <pre lang="hbs">{{#if (gt var_one var_two)}}{{ var_three }}{{/if}}</pre> |
|     `gte`    | returns true if the first value is greater than or equal to the second | [Boolean][] | <pre lang="hbs">{{#if (gte var_one var_two)}}{{ var_three }}{{/if}}</pre>                  |
|  `includes`  | returns true if the input (string \| array) includes the second value  | [Boolean][] | <pre lang="hbs">{{#if (includes some_array 'one')}}{{ var_one }}{{/if}}</pre>              |
|    `lower`   | returns the lower cased varient of the input string                    |  [String][] | <pre lang="hbs">{{ lower my_var }}</pre>                                                   |
|     `lt`     | returns true if the first value is less than the second                | [Boolean][] | <pre lang="hbs">{{#if (lt var_one var_two)}}{{ var_three }}{{/if}}</pre>                   |
|     `lte`    | returns true if the first value is less than or equal to the second    | [Boolean][] | <pre lang="hbs">{{#if (lte var_one var_two)}}{{ var_three }}{{/if}}</pre>                  |
|     `neq`    | returns true if two values are not equal to each other                 | [Boolean][] | <pre lang="hbs">{{#if (neq var_one var_two)}}{{ var_three }}{{/if}}</pre>                  |
|    `pick`    | returns the first non null-ish value. Will treat `false` as a value    |    `any`    | <pre lang="hbs">{{#with (pick var_one, var_two) as \| value \|}}{{ value }}{{/with}}</pre> |
|    `split`   | splits csv values into a javascript array                              |  [Array][]  | <pre lang="hbs">{{#each (split csv_value)}}{{ this }}{{/each}}                             |
| `startswith` | returns true if a string starts with another                           | [Boolean][] | <pre lang="hbs">{{#if (starts myvar 'foo')}}{{ othervar }}{{/if}}</pre>                    |
|    `upper`   | returns the upper cased varient of the input string                    |  [String][] | <pre lang="hbs">{{upper my_var}}</pre>                                                     |

### Build Flags

Using the `dockerBuildFlags` option allows you to pass arbitrary flags to the build command.
If the standardized options are not sufficient, `dockerBuildFlags` is a perfect workaround
until first class support can be added. This is considered and advanced feature, and you should
know what you intend to do before using. There is no validation, and any configuration of the
docker daemon required is expected to be done before hand. 

Keys found in `dockerBuildFlags` are normalized as command line flags in the following manner:

* If the key does not start with a `-` it will be prepended
* all occurences of `_` will be re-written as `-`
* Single letter keys are considered shorthands e.g. `p` becomes `-p`
* Multi letter keys are considered long form e.g. `foo_bar` becomes `--foo-bar`
* If the value is an array, the flag is repeated for each occurance
* A `null` value may be used to omit the value and only inject the flag itself

#### Example

```javascript
{
  plugins: [
    ['@codedependant/semantic-release-docker', {
      dockerImage: 'my-image',
      dockerRegistry: 'quay.io',
      dockerProject: 'codedependant',
      dockerCacheFrom: 'myname/myapp'
      dockerBuildFlags: {
        pull: null
      , target: 'release'
      },
      dockerArgs: {
        GITHUB_TOKEN: null
      }
    }]
  ]
}
```

This configuration, will generate the following build command

```bash
> docker build --network=default --quiet --tag quay.io/codedependant/my-image:abc123 --cache-from myname/myapp --build-arg GITHUB_TOKEN --pull --target release -f path/to/repo/Dockerfile /path/to/repo
```

## Usage

**full configuration**:

```javascript
// release.config.js

module.exports = {
  branches: ['main']
  plugins: [
    ['@codedependant/semantic-release-docker', {
      dockerTags: ['latest', '{{version}}', '{{major}}-latest', '{{major}}.{{minor}}'],
      dockerImage: 'my-image',
      dockerFile: 'Dockerfile',
      dockerRegistry: 'quay.io',
      dockerProject: 'codedependant',
      dockerPlatform: ['linux/amd64', 'linux/arm64']
      dockerBuildFlags: {
        pull: null
      , target: 'release'
      },
      dockerArgs: {
        API_TOKEN: null
      , RELEASE_DATE: new Date().toISOString()
      , RELEASE_VERSION: '{{next.version}}'
      }
    }]
  ]
}
```

results in `quay.io/codedependant/my-image` with tags `latest`, `1.0.0`, `1-latest` and the `1.0` determined by `semantic-release`.

Alternatively, using global options w/ root configuration
```json5
// package.json
{
  "name": "@codedependant/test-project"
  "version": "1.0.0"
  "release": {
    "extends": "@internal/release-config-docker",
    "dockerTags": ["latest", "{{version}}", "{{major}}-latest", "{{major}}.{{minor}}"],
    "dockerImage": "my-image",
    "dockerFile": "Dockerfile",
    "dockerRegistry": "quay.io",
    "dockerArgs": {
      "GITHUB_TOKEN": null
    , "SOME_VALUE": '{{git_sha}}'
    }
  }
}
```

This would generate the following for a `1.2.0` build

```shell
$ docker build -t quay.io/codedependant/my-image --build-arg GITHUB_TOKEN --build-arg SOME_VALUE=6eada70 -f Dockerfile .
$ docker tag <SHA1> latest
$ docker tag <SHA1> 1.2.0
$ docker tag <SHA1> 1.2
$ docker tag <SHA1> 1-latest
$ docker push quay.io/codedependant/my-image
```

**minimum configuration**:

```json
{
  "release": {
    "plugins": [
      "@codedependant/semantic-release-docker"
    ]
  }
}
```

* A package name `@codedependant/test-project` results in docker project name`codedependant` and image name `test-project`
* A package name `test-project` results in a docker image name `test-project`

the default docker image tags for the 1.0.0 release would be `1.0.0`, `1-latest`, `latest`

**example prerelease configuration**:

```json
{
  "release": {
    "dockerTags": [
      "{{#if prerelease.[0]}}{{prerelease.[0]}}{{else}}latest{{/if}}",
      "{{major}}-{{#if prerelease.[0]}}{{prerelease.[0]}}{{else}}latest{{/if}}",
      "{{major}}.{{minor}}-{{#if prerelease.[0]}}{{prerelease.[0]}}{{else}}latest{{/if}}",
      "{{version}}"
    ]
  }
}
```

the docker tags for version `1.2.3` will be `1.2.3`, `1.2-latest`, `1-latest` and `latest`
the docker tags for version `2.3.4-beta.6` will be `2.3.4-beta.6`, `2.3-beta`, `2-beta` and `beta`

## GitHub Actions

The plugin has some basic support for github actions by exposing several outputs and environment variables
during the publish stage

> [!WARNING]
>
> When using buildx image shas are different per platform, and as such using the shas directly
> is not supported and may result in unexpected results.

### Outputs

| name                     | description                                                                        | example                                                            |
|--------------------------|------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `docker_image`           | The full name of the docker image including the registry, sans any tag information | quay.io/codedependant/my-image                                     |
| `docker_image_build_id`  | The unique build id used to initial build the image during a release               |                                                                    |
| `docker_image_sha_short` | A shorted version of the image sha value suitable for referencing the image        | `b94d27b9934d3e0`                                                  |
| `docker_image_sha_long`  | The full sha256 value that points the image that was build during a release        | `b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9` |

### Environment Variables

| name                                      | description                                                                        | example                                                            |
|-------------------------------------------|------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `SEMANTIC_RELEASE_DOCKER_IMAGE`           | The full name of the docker image including the registry, sans any tag information | quay.io/codedependant/my-image                                     |
| `SEMANTIC_RELEASE_DOCKER_IMAGE_BUILD_ID`  | The unique build id used to initial build the image during a release               |                                                                    |
| `SEMANTIC_RELEASE_DOCKER_IMAGE_SHA_SHORT` | A shorted version of the image sha value suitable for referencing the image        | `b94d27b9934d3e0`                                                  |
| `SEMANTIC_RELEASE_DOCKER_IMAGE_SHA_LONG`  | The full sha256 value that points the image that was build during a release        | `b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9` |

## Development

### Docker Registry

To be able to push to the local registry with auth credentials, ssl certificates are required.
This project uses self signed certs. To regenerate the certs run the following:

```bash
$ openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout server.key -out server.crt
```

**NOTE**: When prompted for an FQDN it must be `registry:5000`
**NOTE**: The credentials for the local registry are **user:** `iamweasel`, **pass:** `secretsquirrel`

[handlebars]: https://handlebarsjs.com
[Boolean]: https://mdn.io/boolean
[String]: https://mdn.io/string
[Array]: https://mdn.io/array
[Object]: https://mdn.io/object
[Number]: https://mdn.io/number
[--cache-from]: https://docs.docker.com/engine/reference/commandline/build/#cache-from
[buildx]: https://docs.docker.com/reference/cli/docker/buildx/build
