'use strict'

/* c8 ignore file */
const COMMIT_TYPES = new Map([
  ['build', 'Build System']
, ['chore', 'Chores']
, ['ci', 'Continuous Integration']
, ['doc', 'Documentation']
, ['default', 'Miscellaneous']
, ['feat', 'Features']
, ['fix', 'Bug Fixes']
, ['lint', 'Lint']
, ['perf', 'Performance Improvements']
, ['refactor', 'Code Refactoring']
, ['revert', 'Reverts']
, ['style', 'Style']
, ['test', 'Tests']
])

function typeOf(type) {
  return COMMIT_TYPES.get(type) || COMMIT_TYPES.get('default')
}

const now = new Date()
const year = now.getFullYear()
const day = String(now.getDate()).padStart(2, '0')
const month = String(now.getMonth() + 1).padStart(2, '0')

module.exports = {
  branches: ['main']
, npmPublish: true
, tarballDir: 'dist'
, parserOpts: {
    noteKeywords: ['BREAKING CHANGES', 'BREAKING CHANGE', 'BREAKING']
  , headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/
  , breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/
  , headerCorrespondence: ['type', 'scope', 'subject']
  , issuePrefixes: ['#', 'gh-']
  , changelogTitle: '# Semantic Release Docker'
  , referenceActions: [
      'close', 'closes', 'closed', 'fix'
    , 'fixes', 'fixed', 'resolve', 'resolves'
    , 'resolved', 'ref'
    ]
  }
, writerOpts: {
    transform(commit) {
      commit.type = typeOf(commit.type)
      commit.shortHash = commit.hash.substring(0, 7)

      for (const note of commit.notes) {
        note.title = '**BREAKING CHANGES**'
      }
      return commit
    }
  , commitPartial: '*{{#if scope}} **{{scope}}**:\n'
      + '{{~/if}} {{#if subject}}\n'
      + '  {{~subject}}\n'
      + '{{~else}}\n'
      + '  {{~header}}\n'
      + '{{~/if}}\n'
      + '\n'
      + '{{~!-- commit link --}} {{#if @root.linkReferences~}}\n'
      + '  [{{shortHash}}](\n'
      + '  {{~#if @root.repository}}\n'
      + '    {{~#if @root.host}}\n'
      + '      {{~@root.host}}/\n'
      + '    {{~/if}}\n'
      + '    {{~#if @root.owner}}\n'
      + '      {{~@root.owner}}/\n'
      + '    {{~/if}}\n'
      + '    {{~@root.repository}}\n'
      + '  {{~else}}\n'
      + '    {{~@root.repoUrl}}\n'
      + '  {{~/if}}/\n'
      + '  {{~@root.commit}}/{{hash}}) - {{committer.name}}\n'
      + '{{~else}}\n'
      + '  {{~shortHash}}\n'
      + '{{~/if}}\n'
      + '\n'
      + '{{~!-- commit references --}}\n'
      + '{{~#if references~}}\n'
      + '  , closes:\n'
      + '  {{~#each references}} {{#if @root.linkReferences~}}\n'
      + '    [\n'
      + '    {{~#if this.owner}}\n'
      + '      {{~this.owner}}/\n'
      + '    {{~/if}}\n'
      + '    {{~this.repository}}#{{this.issue}}](\n'
      + '    {{~#if @root.repository}}\n'
      + '      {{~#if @root.host}}\n'
      + '        {{~@root.host}}/\n'
      + '      {{~/if}}\n'
      + '      {{~#if this.repository}}\n'
      + '        {{~#if this.owner}}\n'
      + '          {{~this.owner}}/\n'
      + '        {{~/if}}\n'
      + '        {{~this.repository}}\n'
      + '      {{~else}}\n'
      + '        {{~#if @root.owner}}\n'
      + '          {{~@root.owner}}/\n'
      + '        {{~/if}}\n'
      + '          {{~@root.repository}}\n'
      + '        {{~/if}}\n'
      + '    {{~else}}\n'
      + '      {{~@root.repoUrl}}\n'
      + '    {{~/if}}/\n'
      + '    {{~@root.issue}}/{{this.issue}})\n'
      + '  {{~else}}\n'
      + '    {{~#if this.owner}}\n'
      + '      {{~this.owner}}/\n'
      + '    {{~/if}}\n'
      + '    {{~this.repository}}#{{this.issue}}\n'
      + '  {{~/if}}{{/each}}\n'
      + '{{~/if}}\n'
  }
, releaseRules: [
    {breaking: true, release: 'major'}
  , {revert: true, release: 'patch'}
  , {type: 'build', release: 'patch'}
  , {type: 'ci', release: 'patch'}
  , {type: 'chore', release: 'patch'}
  , {type: 'refactor', release: 'patch'}
  , {type: 'test', release: 'patch'}
  , {type: 'doc', release: 'patch'}
  , {type: 'fix', release: 'patch'}
  , {type: 'lib', release: 'patch'}
  , {type: 'perf', release: 'minor'}
  , {type: 'style', release: 'patch'}
  ]
, plugins: [
    ['@semantic-release/commit-analyzer', null]
  , ['@semantic-release/release-notes-generator', null]
  , ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md'
    , changelogTitle: '# Semantic Release Docker'
    }]
  , ['@semantic-release/npm', null]
  , ['@semantic-release/git', {
      assets: [
        'package.json'
      , 'package-lock.json'
      , 'pnpm-lock.yaml'
      , 'CHANGELOG.md'
      , '!**/node_modules/**'
      ]
    , message: `release: ${year}-${month}-${day}, `
        + 'Version <%= nextRelease.version %> [skip ci]'
    }]
  , ['@semantic-release/github', {
      assets: 'dist/*'
    }]
  ]
}
