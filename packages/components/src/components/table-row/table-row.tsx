import { h } from '@stencil/core';

export const TableRow = props => {
  return (
    <tr>
      <td>{props.item.id}</td>
      <td>{props.item.name}</td>
      <td>{props.item.phone}</td>
    </tr>
  );
};
