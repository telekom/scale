---
title: Carousel
description: Carousel element
url: /docs/carousel
contributors:
  - maomaoZH
  - eeegor
---

# Carousel

Carousel component

selector: `t-carousel`

## Carousel horizontal

```javascript
<t-carousel>
  <div slot="arrow-left">&larr;</div>
  <div>
    <img src="http://placehold.it/400x300/d3dce6" />
  </div>
  <div>
    <img src="http://placehold.it/400x300/99a9bf" />
  </div>
  <div>
    <img src="http://placehold.it/400x300/d3dce6" />
  </div>
  <div>
    <img src="http://placehold.it/400x300/99a9bf" />
  </div>
  <div slot="arrow-right">&rarr;</div>
</t-carousel>
```

<div class="demo-container">
  <t-carousel>
    <div slot="arrow-left">&larr;</div>
    <div><img src="http://placehold.it/400x300/d3dce6" /></div>
    <div><img src="http://placehold.it/400x300/99a9bf" /></div>
    <div><img src="http://placehold.it/400x300/d3dce6" /></div>
    <div><img src="http://placehold.it/400x300/99a9bf" /></div>
    <div slot="arrow-right">&rarr;</div>
  </t-carousel>
</div>

## Carousel vertical

```javascript
<t-carousel vertical>
  <div>
    <img src="http://placehold.it/400x300/d3dce6" />
  </div>
  <div>
    <img src="http://placehold.it/400x300/99a9bf" />
  </div>
  <div>
    <img src="http://placehold.it/400x300/d3dce6" />
  </div>
  <div>
    <img src="http://placehold.it/400x300/99a9bf" />
  </div>
</t-carousel>
```

<div class="demo-container">
  <t-carousel vertical>
    <div><img src="http://placehold.it/400x300/d3dce6" /></div>
    <div><img src="http://placehold.it/400x300/99a9bf" /></div>
    <div><img src="http://placehold.it/400x300/d3dce6" /></div>
    <div><img src="http://placehold.it/400x300/99a9bf" /></div>
  </t-carousel>
</div>
