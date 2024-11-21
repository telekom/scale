<template>
  <div>
    <div class="visually-hidden">
      <svg>
        <defs>
          <g id="icon-profile">
            <path
              d="M8.9 16.5l3.1 3.1 3.1-3.1h2.25c2.35 0 4.3 1.65 4.7 3.95l.15 1.05H1.8l.15-1.05c.4-2.3 2.35-3.95 4.7-3.95H8.9zM12 2c3.5 0 6 2.5 6 6 0 1.25-.35 2.55-.95 3.65-1 1.9-2.8 3.35-5.05 3.35s-4.05-1.45-5.05-3.35C6.35 10.55 6 9.25 6 8c0-3.5 2.5-6 6-6zm0 1.5C9.4 3.5 7.5 5.4 7.5 8c0 .85.2 1.75.55 2.55.7 1.65 2.15 2.95 3.95 2.95 1.8 0 3.25-1.3 3.95-2.95.35-.8.55-1.7.55-2.55 0-2.6-1.9-4.5-4.5-4.5z"
              fill-rule="nonzero"
            />
          </g>
          <g id="icon-search">
            <path
              d="M10 2a8 8 0 016.472 12.703l4.912 4.913.06.065a1.25 1.25 0 01-1.726 1.794l-.102-.091-4.913-4.912A8 8 0 1110 2zm0 1.5A6.508 6.508 0 003.5 10c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5z"
              fill-rule="nonzero"
            />
          </g>
          <g id="icon-shopping-bag">
            <path
              d="M11.84 1.5a4.5 4.5 0 014.495 4.288l.004.212v.749l4.45.001.883 12.794a3 3 0 01-2.993 3.206H5a3 3 0 01-2.992-3.206L2.89 6.75h4.45V6l.002-.133A4.5 4.5 0 0111.84 1.5zm7.549 6.75h-15.1l-.785 11.397A1.5 1.5 0 005 21.25h13.68l.088-.003a1.5 1.5 0 001.407-1.6L19.39 8.25zM8.089 9.5a1 1 0 11.002 1.999A1 1 0 018.089 9.5zm7.5 0a1 1 0 11.002 1.999 1 1 0 01-.002-1.999zM11.84 3a3 3 0 00-2.994 2.824L8.839 6v.75l6-.001V6l-.002-.112A3 3 0 0011.84 3z"
              fill-rule="nonzero"
            />
          </g>
          <g id="icon-menu">
            <path
              d="M20.5,16.5 L20.5,18.5 L3.5,18.5 L3.5,16.5 L20.5,16.5 Z M20.5,11 L20.5,13 L3.5,13 L3.5,11 L20.5,11 Z M20.5,5.5 L20.5,7.5 L3.5,7.5 L3.5,5.5 L20.5,5.5 Z"
              fill-rule="nonzero"
            ></path>
          </g>
        </defs>
      </svg>
    </div>
    <scale-icon
      :name="name"
      :path="path"
      :size="size"
      :fill="fill"
      :stroke="stroke"
      :focusable="focusable"
      :decorative="decorative"
      :accessibility-title="accessibilityTitle"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    path: String,
    size: { type: Number, default: 24 },
    fill: { type: String, default: 'var(--icon-color, currentColor)' },
    stroke: { type: String, default: 'transparent' },
    focusable: { type: Boolean, default: false },
    decorative: { type: Boolean, default: false },
    accessibilityTitle: { type: String },
  }
}
</script>

<style scoped>
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
