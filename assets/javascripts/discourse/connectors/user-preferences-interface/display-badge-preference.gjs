import Component from "@glimmer/component";
import PreferenceCheckbox from "discourse/components/preference-checkbox";
import { i18n } from "discourse-i18n";

export default class DisplayBadgePreference extends Component {
  static shouldRender(_args, { siteSettings }) {
    return siteSettings.badge_display_enabled;
  }

  <template>
    <hr />
    <label class="control-label">{{i18n
        "display_badge.display_preference_title"
      }}</label>
    <PreferenceCheckbox
      @labelKey="display_badge.display_preference_label"
      @checked={{@outletArgs.model.custom_fields.display_badges}}
    />
  </template>
}
