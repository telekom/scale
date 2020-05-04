export type TDirection =
  | 'ascending'
  | 'descending'
  | 'none'
  | 'other'
  | ''
  | undefined;

export const SORT_INDICATOR_ID = 'scale-sort-indicator';

export const getSortIndicator = (direction: TDirection) =>
  `<span id="${SORT_INDICATOR_ID}">
        ${
          !direction || ['none', 'other'].includes(direction)
            ? '<span />'
            : `<svg  width="6px" height="9px" viewBox="0 0 6 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="${SORT_INDICATOR_ID}-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="${SORT_INDICATOR_ID}-2" transform="translate(-183.000000, -7310.000000)">
                    <g id="${SORT_INDICATOR_ID}-3" transform="translate(174.000000, 6631.000000)">
                      <g id="${SORT_INDICATOR_ID}-4" transform="translate(0.000000, 668.000000)">
                        <g id="${SORT_INDICATOR_ID}-5">
                          <polygon id="Rectangle" fill="${
                            direction === 'ascending' ? '#000000' : '#CDCDCD'
                          }" transform="translate(12.000000, 14.000000) rotate(45.000000) translate(-12.000000, -14.000000) " points="10 12 14 12 10 16"></polygon>
                          <polygon id="Rectangle" fill="${
                            direction === 'ascending' ? '#CDCDCD' : '#000000'
                          }" transform="translate(12.000000, 17.000000) scale(1, -1) rotate(45.000000) translate(-12.000000, -17.000000) " points="10 15 14 15 10 19"></polygon>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>`
        }
    </span>
`;
