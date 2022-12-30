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

      console.log(dec.attrs.display_badges);

      let badges = []
      for (let i = 0; i < dec.attrs.display_badges.length ; i ++){
        let badge = dec.attrs.display_badges[i]
        console.log(badge)
        
        let img = dec.h("img.badge-display-icon", {"src": badge["image_url"]})
        badges.push(img)

      }

      return [ dec.h("div.user-badge-display", badges) ];


           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/7482d7aca9dcae90c955e076e7daac48f3b9053d.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/37564c2cb811f7f558290f56ab23dd14fee21630.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/ab0e3a3222b2d061a85fa1b0f6bc0bb05792a8c7.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/2adc5e2a1dc4844e8b39b898b5c322a246b63ceb.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/76361393ee3dcd8daceb34f6145c27089425eed4.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/6affb4b5c0ff9823dbb910b009ebc94f484d0592.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/861d5b5bc83518d5dde9484dc0a9f0f18c6b9f05.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/9145f85836e6ca6c537896490d53bf4f18b929cd.png"}),
           //dec.h("img.badge-display-icon", {"src":"https://www.elitefourum.com/uploads/default/original/1X/ec50c0d30a9a42612622d37e3a633923481fe828.svg"})

      return makeArray(badges)
      .map((badge) => {
        return {
          icon: badge.icon.replace("fa-", ""),
          imageUrl: badge.image_url,
          className: BADGE_CLASS[badge.badge_type_id - 1],
          name: badge.slug,
          id: badge.id,
          badgeGroup: badge.badge_grouping_id,
          title: badge.description.replace(/<\/?[^>]+(>|$)/g, ""),
          url: `/badges/${badge.id}/${badge.slug}${badgePage}`,
        };
      });

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
