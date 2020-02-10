import { Component, h, Build } from '@stencil/core';
import { fileNotFound } from '../../global/site-structure-utils';


@Component({
  tag: 'notfound-page',
  styleUrl: 'notfound-page.css'
})
export class NotFoundPage {

  render() {
    if (!Build.isBrowser) {
      fileNotFound();
      return null;
    }

    return (
      <div>
        <h1>Uh oh! We can't find the page you're looking for.</h1>
        <p>
          <stencil-route-link url='/' class='block'>
            Back to the home page
          </stencil-route-link>
        </p>
      </div>
    );
  }
}
