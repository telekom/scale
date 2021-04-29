/**
 * Copy/pasted from https://github.com/andreasbm/focus-trap
 */

/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * We need to traverse each child-depth one at a time because if an element should be skipped
 * (for example because it is hidden) we need to skip all of it's children. If we use querySelectorAll("*")
 * the information of whether the children is within a hidden parent is lost.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
export function queryShadowRoot(
  root: ShadowRoot | HTMLElement,
  skipNode: ($elem: HTMLElement) => boolean,
  isMatch: ($elem: HTMLElement) => boolean,
  maxDepth: number = 20,
  depth: number = 0
): HTMLElement[] {
  const matches: HTMLElement[] = [];

  // If the depth is above the max depth, abort the searching here.
  if (depth >= maxDepth) {
    return matches;
  }

  // Traverses a slot element
  const traverseSlot = ($slot: HTMLSlotElement) => {
    // Only check nodes that are of the type Node.ELEMENT_NODE
    // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const assignedNodes = $slot
      .assignedNodes()
      .filter((node) => node.nodeType === 1);
    if (assignedNodes.length > 0) {
      const $slotParent = assignedNodes[0].parentElement!;
      return queryShadowRoot(
        $slotParent,
        skipNode,
        isMatch,
        maxDepth,
        depth + 1
      );
    }

    return [];
  };

  // Go through each child and continue the traversing if necessary
  // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
  // Therefore we fallback to an empty array if it is undefined.
  const children = Array.from(root.children || []) as HTMLElement[];
  for (const $child of children) {
    // Check if the element and its descendants should be skipped
    if (skipNode($child)) {
      // console.log('-- SKIP', $child);
      continue;
    }

    // console.log('$child', $child);

    // If the element matches we always add it
    if (isMatch($child)) {
      matches.push($child);
    }

    if ($child.shadowRoot != null) {
      // If the element has a shadow root we need to traverse it
      matches.push(
        ...queryShadowRoot(
          $child.shadowRoot,
          skipNode,
          isMatch,
          maxDepth,
          depth + 1
        )
      );
    } else if ($child.tagName === 'SLOT') {
      // If the child is a slot we need to traverse each assigned node
      matches.push(...traverseSlot($child as HTMLSlotElement));
    } else {
      // Traverse the children of the element
      matches.push(
        ...queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1)
      );
    }
  }

  return matches;
}

/**
 * Returns whether the element is hidden.
 * @param $elem
 */
export function isHidden($elem: HTMLElement): boolean {
  return (
    $elem.hasAttribute('hidden') ||
    ($elem.hasAttribute('aria-hidden') &&
      $elem.getAttribute('aria-hidden') !== 'false') ||
    // A quick and dirty way to check whether the element is hidden.
    // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
    // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
    // we won't be able to catch it here. We accept it due to the huge performance benefits.
    $elem.style.display === `none` ||
    $elem.style.opacity === `0` ||
    $elem.style.visibility === `hidden` ||
    $elem.style.visibility === `collapse`
  );

  // If offsetParent is null we can assume that the element is hidden
  // https://stackoverflow.com/questions/306305/what-would-make-offsetparent-null
  // || $elem.offsetParent == null;
}

/**
 * Returns whether the element is disabled.
 * @param $elem
 */
export function isDisabled($elem: HTMLElement): boolean {
  return (
    $elem.hasAttribute('disabled') ||
    ($elem.hasAttribute('aria-disabled') &&
      $elem.getAttribute('aria-disabled') !== 'false')
  );
}

/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
export function isFocusable($elem: HTMLElement): boolean {
  // Discard elements that are removed from the tab order.
  if (
    $elem.getAttribute('tabindex') === '-1' ||
    isHidden($elem) ||
    isDisabled($elem)
  ) {
    return false;
  }

  return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute('tabindex') ||
    // Anchor tags or area tags with a href set
    (($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) &&
      $elem.hasAttribute('href')) ||
    // Form elements which are not disabled
    $elem instanceof HTMLButtonElement ||
    $elem instanceof HTMLInputElement ||
    $elem instanceof HTMLTextAreaElement ||
    $elem instanceof HTMLSelectElement ||
    // IFrames
    $elem instanceof HTMLIFrameElement
  );
}
