# Ladder Reset

Tracks video game seasons and displays countdowns. Built with Charsi.

## Release data

Releases are fetched at build time from Tristram through the private `town-portal` gem. The generated site stays static: visitors read `releases.json` and `releases.ics`, never the authenticated API. Each release has one optional `patch_notes_url`; videos and multiple release buttons are no longer supported. Predictions are fetched from the separate authenticated `predictions` endpoint at build time and published as static `predictions.json`. The Predictions tab replaces Events. Rough ETAs use early/mid/end-of-month labels; dates are shown only at 90% or better historical timing accuracy with at least five backtests. Accuracy is the share of up to five recent forecasts within seven days, not a calibrated future probability. Forecast windows are shown separately.

The original 27 releases are archived in Tristram at `db/imports/ladder-reset-releases.yml` for the one-time, repeatable import. Edit releases in Tristram afterward, then trigger a Pages deployment to publish the changes. No YAML fallback: a failed API request fails the build and leaves the previous deployment live.

## Build

Set these environment variables outside source control:

- `TRISTRAM_URL`: HTTPS origin of the Worker bridge (no `/api/v1` suffix).
- `TRISTRAM_API_KEY`: global key from the production Tristram Settings page.
- `TOWN_PORTAL_DEPLOY_KEY`: read-only SSH deploy key for the private Town Portal repository; optional locally if your SSH identity already has access.

```sh
bin/build
```

Cloudflare Pages must use `bin/build` as its build command, `_build` as its output directory, and `SKIP_DEPENDENCY_INSTALL=1`. The build script installs dependencies after configuring the private gem's read-only SSH key. Store the API key and deploy key as encrypted Pages environment variables, not plaintext config or Worker output.

Only production needs these secrets. Preview builds remain disabled until a separate preview-data policy is chosen. The gem repositories are pinned in `Gemfile.lock`; updates are deliberate.

For a local SSH tunnel, `TRISTRAM_URL=http://127.0.0.1:8080` is supported. Keep the API key in your shell environment or a private local secrets file.

## Tests

```sh
bundle exec ruby -e 'Dir["test/*_test.rb"].each { |file| require_relative file }'
```

Tests use Minitest from the test dependency group. Charsi's own tests verify that each build gets fresh helper state.
