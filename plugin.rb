# frozen_string_literal: true

# name: discourse-badge-display
# about: Show badges next to Discourse posts
# version: 0.1
# author: Scott Mastro
# url: https://github.com/ScottMastro/discourse-badge-display
# transpile_js: true

enabled_site_setting :badge_display_enabled

after_initialize do
  User.register_custom_field_type('display_badges', :boolean)
  register_editable_user_custom_field :display_badges
  DiscoursePluginRegistry.serialized_current_user_fields << 'display_badges'

  add_to_serializer(:post, :display_badges) do
    ActiveModel::ArraySerializer.new(object&.user&.display_badges, each_serializer: BadgeSerializer).as_json
  end
  
  add_to_class(:user, :display_badges) do
    ids = SiteSetting.displayed_badge_ids.split('|').map(&:to_i)
    badges.select { |b| ids.include?(b.id) }
  end

end

register_asset "stylesheets/common/common.scss"
register_asset "stylesheets/desktop/desktop.scss", :desktop
register_asset "stylesheets/mobile/mobile.scss", :mobile