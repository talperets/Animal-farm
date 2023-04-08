import React from "react";

export default function Animal({ type, name, age, address }) {
  return (
    <li>
      <strong>{type}</strong>
       {'  '}
       {name}
       {'  '}
       {age}
       {'  '}
       {address}
    </li>
  );
}
