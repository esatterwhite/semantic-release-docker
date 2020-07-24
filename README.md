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
Tags support simple templating. Values enclosed in braces `{}` will be subsititued with release context information

## Installation

Run `npm i --save-dev @codedependant/semantic-release-docker` to install this semantic-release plugin.

## Configuration

### Docker registry authentication

The `docker registry` authentication set via environment variables. It is not required, and if
omitted, it is assumed the docker daemon is already authenticated with the targe registry.

### Environment variables

| Variable                 | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| DOCKER_REGISTRY_USER     | The user name to authenticate with at the registry.                                       |
| DOCKER_REGISTRY_PASSWORD | The password used for authentication at the registry.                                     |

### Options

| Option         | Description                                                                                                                                 | Default
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------
| tags           | _Optional_. An array of strings allowing to specify additional tags to apply to the image.                                                  | [`latest`, `{major}-latest`, `{version}`] |
| image          | _Optional_. The name of the image to release.                                                                                               | Parsed from package.json `name` property
| registry       | _Optional_. The hostname and port used by the the registry in format `hostname[:port]`. Omit the port if the registry uses the default port | `null` (dockerhub)
| project        | _Optional_. The project or repository name to publish the image to                                                                          | For scoped packages, the scope will be used, otherwise `null`
| dockerfile     | _Optional_. The path, relative to `$PWD` to a Docker file to build the target image with                                                    | `Dockerfile`
| context        | _Optional_. A path, relative to `$PWD` to use as the build context A                                                                        | `.`

## Usage

full configuration:

```json
{
  "release": {
    "plugins": [
      ["@codedependant/semantic-release-docker", {
        "path": "@codedependant/semantic-release-docker",
        "tags": ["{version}", "{major}", "{major}.{minor}"],
        "image": "my-image",
        "dockerfile": "Dockerfile",
        "registry": "quay.io",
        "project": "codedependant"
      }]
    ]
  }
}
```

results in `quay.io/codedependant/my-image` with tags `1.0.0`, `1` and the `1.0` determined by `semantic-release`.

minimum configuration:

```json
{
  "release": {
    "plugins": [
      "@codedependant/semantic-release-docker"
    ]
  }
}
```

* A package name `@codedependant/test-project` results in `codedependant/test-project`
* A package name `test-project` results in `test-project`

the default tags @1.0.0 would be `1.0.0`, `1-latest`, `latest`

## Development

#### Docker Registry

To be able to push to the local registry with auth credentials, ssl certificates are required.
This project uses self signed certs. To regenerate the certs run the following:

```bash
$ openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout server.key -out server.crt
```

**NOTE**: When prompted for an FQDN it must be `registry:5000`
**NOTE**: The credentials for the local registry are **user:** `iamweasel`, **pass:** `secretsquirrel`
