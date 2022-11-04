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

The `docker registry` authentication set via environment variables. It is not required, and if
omitted, it is assumed the docker daemon is already authenticated with the target registry.

### Environment variables

| Variable                 | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| DOCKER_REGISTRY_USER     | The user name to authenticate with at the registry.                                       |
| DOCKER_REGISTRY_PASSWORD | The password used for authentication at the registry.                                     |

### Options

| Option            | Description                                                                                                                                                            | Default                                                       |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| `dockerTags`      | _Optional_. An array of strings allowing to specify additional tags to apply to the image. Supports templating                                                         | [`latest`, `{{major}}-latest`, `{{version}}`]                 |
| `dockerImage`     | _Optional_. The name of the image to release.                                                                                                                          | Parsed from package.json `name` property                      |
| `dockerRegistry`  | _Optional_. The hostname and port used by the the registry in format `hostname[:port]`. Omit the port if the registry uses the default port                            | `null` (dockerhub)                                            |
| `dockerProject`   | _Optional_. The project or repository name to publish the image to                                                                                                     | For scoped packages, the scope will be used, otherwise `null` |
| `dockerFile`      | _Optional_. The path, relative to `$PWD` to a Docker file to build the target image with                                                                               | `Dockerfile`                                                  |
| `dockerContext`   | _Optional_. A path, relative to `$PWD` to use as the build context A                                                                                                   | `.`                                                           |
| `dockerLogin`     | _Optional_. Set to false it by pass docker login if the docker daemon is already authorized                                                                            | `true`                                                        |
| `dockerArgs`      | _Optional_. Include additional values for docker's `build-arg`. Supports templating                                                                                    |                                                               |
| `dockerPublish`   | _Optional_. Automatically push image tags during the publish phase.                                                                                                    | `true`                                                        |
| `dockerVerifyCmd` | _Optional_. If specified, during the verify stage, the specified command will execute in a container of the build image. If the command errors, the release will fail. | `false`                                                       |
| `dockerNetwork`   | _Optional_. Specify the Docker network to use while the image is building. |
`default`

### Build Arguments

By default several build arguments will be included when the docker images is being built.
Build arguments can be templated in the same fashion as docker tags. If the value for a
build argument is explicitly `true`, the value will be omitted and the value from
a matching environment variable will be utilized instead. This can be useful when trying to include
secrets and other sensitive information

| Argument Name       | Description                                                                                | Default                      |
|---------------------|--------------------------------------------------------------------------------------------|------------------------------|
| `SRC_DIRECTORY`     | The of the directory the build was triggered from                                          | The directory name of CWD    |
| `TARGET_PATH`       | Path relative to the execution root. Useful for Sharing a Single Docker file in monorepos |                              |
| `NPM_PACKAGE_NAME`  | The `name` property extracted from `package.json` - if present                             |                              |
| `NPM_PACKAGE_SCOPE` | The parsed scope from the `name` property from `package.json` - sans `@`                   |                              |
| `CONFIG_NAME`       | The configured name of the docker image.                                                   | The parsed package name      |
| `CONFIG_PROJECT`    | The configured docker repo project name                                                    | The package scope if present |
| `GIT_SHA`           | The commit SHA of the current release                                                      |                              |
| `GIT_TAG`           | The git tag of the current release                                                         |                              |

### Template Variables

String template will be passed these

| Variable name  | Description                                                        | Type            |
|----------------|--------------------------------------------------------------------|-----------------|
| `git_sha`      | The commit SHA of the current release                              | `String`        |
| `git_tag`      | The git tag of the current release                                 | `String`        |
| `release_type` | The severity type of the current build (`major`, `minor`, `patch`) | `String`        |
| `relase_notes` | The release notes blob associated with the release                 | `String`        |
| `next`         | Semver object representing the next release                        | `Object`        |
| `previous`     | Semver object representing the previous release                    | `Object`        |
| `major`        | The major version of the next release                              | `Number`        |
| `minor`        | The minor version of the next release                              | `Number`        |
| `patch`        | The patch version of the next release                              | `Number`        |
| `prerelease`   | The prerelease versions of the next release                        | `Array<Number>` |
| `env`          | Environment variables that were set at build time                  | `Object`        |
| `pkg`          | Values parsed from `package.json`                                  | `Object`        |
| `build`        | A Random build hash representing the current execution context     | `String`        |
| `now`          | Current timestamp is ISO 8601 format                               | `String`        |

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
      dockerArgs: {
        API_TOKEN: true
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
      "GITHUB_TOKEN": true
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
