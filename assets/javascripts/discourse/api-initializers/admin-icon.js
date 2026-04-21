import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  api.setAdminPluginIcon("discourse-badge-display", "medal");
});
