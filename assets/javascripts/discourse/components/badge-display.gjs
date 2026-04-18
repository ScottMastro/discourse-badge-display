import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class BadgeDisplay extends Component {
  @service currentUser;
  @service siteSettings;

  get enabled() {
    if (this.currentUser) {
      return (
        this.currentUser.get("custom_fields.display_badges") ??
        this.siteSettings.display_badges_by_default
      );
    }
    return this.siteSettings.display_badges_by_default;
  }

  get badges() {
    const badgeData = this.args.outletArgs.post?.display_badges;
    if (!badgeData) {
      return [];
    }

    const byId = {};
    for (const badge of badgeData) {
      byId[badge.id] = badge;
    }

    return this.siteSettings.displayed_badge_ids
      .split("|")
      .map((id) => byId[id])
      .filter(Boolean);
  }

  <template>
    {{#if this.enabled}}
      {{#if this.badges.length}}
        <div class="user-badge-display">
          {{#each this.badges as |badge|}}
            <img
              class="badge-display-icon"
              src={{badge.image_url}}
              alt={{badge.name}}
            />
          {{/each}}
        </div>
      {{/if}}
    {{/if}}
  </template>
}
