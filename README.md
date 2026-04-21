# discourse-badge-display

Shows a curated set of badges next to each poster on every post. Admins pick which badges count; users can hide the display from their preferences.

## Settings

- `badge_display_enabled` — master on/off for the plugin.
- `displayed_badge_ids` — pipe-separated list of badge IDs that are eligible to appear. Badges not on this list are never shown.
- `display_badges_by_default` — whether badges show for users who haven't set a preference.

## User preference

In **Preferences → Interface**, users can toggle "Show badges" to opt in or out. The toggle overrides `display_badges_by_default`.

## Where badges appear

Badges render in the `post-meta-data-poster-name` outlet on every post, as small icons linking nowhere (visual only).
