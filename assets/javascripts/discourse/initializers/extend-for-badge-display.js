import { withPluginApi } from "discourse/lib/plugin-api";
import BadgeDisplay from "../components/badge-display";

function addSetting(api) {
  api.modifyClass("controller:preferences/interface", {
    pluginId: "discourse-badge-display",
    actions: {
      save() {
        this.get("saveAttrNames").push("custom_fields");
        this._super();
      },
    },
  });
}

function attachBadges(api) {
  api.addTrackedPostProperties("display_badges");
  api.renderAfterWrapperOutlet("post-meta-data-poster-name", BadgeDisplay);
}

export default {
  name: "extend-for-badge-display",
  initialize(container) {
    const siteSettings = container.lookup("service:site-settings");
    if (siteSettings.badge_display_enabled) {
      withPluginApi((api) => addSetting(api));
      withPluginApi((api) => attachBadges(api));
    }
  },
};
