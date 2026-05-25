# UKey Actions

> Reusable GitHub Actions and workflows powering CI/CD across UKey
> wallet, hardware firmware, mobile, desktop, web and browser extension
> repositories.

## What's inside

- **Reusable workflows** — versioned CI/CD pipelines (build, test, lint,
  release) that downstream UKey repositories invoke with a one-line
  `uses:` declaration.
- **Composite actions** — small focused units of automation (APK channel
  tagging via VasDolly, EAS build orchestration, locale fetch, version
  bump, changelog generation, etc.).

## Goals

- **Single source of truth** for our CI behavior — no more drift between
  repositories.
- **Auditability** — every release pipeline change goes through PR review
  here, so signing / publishing flows are versioned and reproducible.
- **Faster onboarding** — a new repo can opt into the standard pipeline
  by adding ~10 lines of YAML instead of copy-pasting hundreds.

## Usage

```yaml
# .github/workflows/ci.yml in a downstream repo
jobs:
  build:
    uses: ukey/actions/.github/workflows/mobile-build.yml@v1
    with:
      flavor: prod
      channel: direct
    secrets: inherit
