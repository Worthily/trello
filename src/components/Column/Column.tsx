import React from 'react';

import Addcardbtn from '../../ui/Add-new-card-btn';

function Column({ header = 'default' }) {
  return (
    <div className="column">
      <h2 className="column__header">{header}</h2>
      <Addcardbtn />
    </div>
  );
}

export default Column;
