import Ember from 'ember';

const { assign } = Ember;

export default function getPosition(el) {
  let isBody = el.tagName === 'BODY';

  // not needed as we won't support IE8
  //
  // if (elRect.width == null) {
  //   // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
  //   elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
  // }

  let isSvg = window.SVGElement && el instanceof window.SVGElement;
  // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
  // See https://github.com/twbs/bootstrap/issues/20280
  let rect = el.getBoundingClientRect();
  let elOffset = isBody ? { top: 0, left: 0 } : (isSvg ? {} : {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  });
  let scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : el.scrollTop };
  let outerDims = isBody ? { width: window.outerWidth, height: window.outerHeight } : {};

  // Ember.assign/Object.assign does not copy properties of DOMRect object, so we have to clone into POJO...
  let clonedRect = {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height
  };

  return assign({}, clonedRect, scroll, outerDims, elOffset);
}
