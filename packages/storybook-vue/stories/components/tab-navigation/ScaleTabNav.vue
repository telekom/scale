<template>
  <scale-tab-nav :size="size">
    <scale-tab-header :disabled="disabled ? true : false" slot="tab">
      <scale-icon-home-home v-if="withIcon" /> General
    </scale-tab-header>
    <scale-tab-panel slot="panel">
      <p class="scl-font-variant-body">
        Freegan kinfolk farm-to-table humblebrag cred, hammock bespoke small
        batch pabst. 90's tumblr whatever direct trade, organic master cleanse
        copper mug schlitz palo santo bushwick ethical pop-up chambray portland.
        Sartorial austin iceland street art, pug asymmetrical marfa mustache
        mumblecore. Shoreditch raclette knausgaard, swag enamel pin food truck
        everyday carry 3 wolf moon.
      </p>
    </scale-tab-panel>
    <scale-tab-header slot="tab">
      <scale-icon-user-file-analytics v-if="withIcon" /> Usage
    </scale-tab-header>
    <scale-tab-panel slot="panel">
      <p class="scl-font-variant-body">
        Bespoke austin pork belly yuccie pop-up. Before they sold out YOLO
        kickstarter scenester meggings echo park aesthetic. Thundercats
        post-ironic wayfarers microdosing etsy hashtag seitan photo booth
        bitters.
      </p>
    </scale-tab-panel>
    <scale-tab-header :selected="preselected ? true : false" slot="tab">
      <scale-icon-content-heart v-if="withIcon" /> Style
    </scale-tab-header>
    <scale-tab-panel slot="panel">
      <p class="scl-font-variant-body">
        Biodiesel chia af hoodie tumeric bespoke letterpress man bun fashion axe
        helvetica brunch godard cray viral prism. Street art tattooed bitters,
        ugh four loko selfies you probably haven't heard of them locavore
        bushwick. Tattooed 90's kinfolk, banh mi umami banjo palo santo cliche.
        Cray wolf godard skateboard celiac taxidermy tacos offal.
      </p>
    </scale-tab-panel>
    <scale-tab-header slot="tab">
      <scale-icon-action-random v-if="withIcon" /> Code
    </scale-tab-header>
    <scale-tab-panel slot="panel">
      <p class="scl-font-variant-body">
        Asymmetrical tattooed chia, banh mi blog microdosing edison bulb
        meditation readymade drinking vinegar brunch irony. Whatever humblebrag
        3 wolf moon kinfolk selvage. Listicle mumblecore forage paleo.
        Asymmetrical hella crucifix ethical.
      </p>
    </scale-tab-panel>
  </scale-tab-nav>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    preselected: { type: Boolean, default: false },
    withIcon: { type: Boolean, default: true },
    size: { type: 'small' | 'large' , default: 'small' }, 
    small: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
p {
  max-width: 60ch;
  margin-top: 0;
}
</style>
