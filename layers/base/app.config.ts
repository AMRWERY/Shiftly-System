export default defineAppConfig({
  icon: {
    size: "24px", // default <icon> size applied
    class: "icon", // default <icon> class applied
    mode: "css", // default <icon> mode applied
    aliases: {
      nuxt: "logos:nuxt-icon",
    },
    cssLayer: "base", // set the css layer to inject to
  },
});
