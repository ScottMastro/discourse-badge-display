import { withPluginApi } from "discourse/lib/plugin-api";

function addSetting(api) {
  api.modifyClass('controller:preferences/interface', {
    pluginId: "discourse-badge-display",
    actions: {
      save () {
        this.get('saveAttrNames').push('custom_fields')
        this._super()
      }
    }
  })
}

function attachBadges(api, siteSettings) {

  api.includePostAttributes("display_badges");
  api.decorateWidget("poster-name:after", (dec) => {

    const currentUser = api.getCurrentUser();
    let enabled = siteSettings.display_badges_by_default

    if (currentUser) {
      enabled =
        currentUser.get("custom_fields.display_badges") ??
        siteSettings.display_badges_by_default;
    }
    if (enabled) {

      let badge_data = dec.attrs.display_badges
      let badge_ids = siteSettings.displayed_badge_ids.split("|");
      let badges = []
      var badge_dict = {};

      for (let i = 0; i < badge_data.length ; i ++){
        badge_dict[badge_data[i]["id"]] = badge_data[i]
      }

      for (let i = 0; i < badge_ids.length ; i ++){
        let b = badge_ids[i]
        if (b in badge_dict){
          let img = dec.h("img.badge-display-icon", 
                      {"src": badge_dict[b]["image_url"],
                      "alt": badge_dict[b]["name"]});
          badges.push(img)
        }
      }
      
      return [ dec.h("div.user-badge-display", badges) ];
    }
  });
}

export default {
  name: "extend-for-badge-display",
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (siteSettings.badge_display_enabled) {
      withPluginApi('0.8.22', api => addSetting(api, siteSettings));
      withPluginApi('0.8.22', (api) => attachBadges(api, siteSettings));
    }
  },
};
