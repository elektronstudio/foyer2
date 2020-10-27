import { initialSettings, settings } from "../settings/index.js";

export default {
  setup() {
    return { initialSettings, settings };
  },
  template: `
  <div
    style="
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 200px;
      overflow: auto;
      color: white;
      padding: 32px;
      background: rgba(30,30,30,0.85);
      display: grid;
      grid-auto-rows: max-content;
      gap: 8px;
    "
  >
    <template v-for="(value, key, i) in settings">
      <div>{{ initialSettings[i].title }}: {{ settings[key] }}</div>
      <textarea
        v-if="initialSettings[i].textarea"
        v-model="settings[key]" 
        :rows="initialSettings[i].rows || 2"
      />
      <input
        v-if="!initialSettings[i].textarea"
        v-model="settings[key]" 
        :type="initialSettings[i].type"
        :min="initialSettings[i].min || 0"
        :max="initialSettings[i].max || 100"
        :step="initialSettings[i].step || 1"
      />
    </template>
  </div>
  `,
};
