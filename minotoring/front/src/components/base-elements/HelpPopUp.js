import React, { useState } from 'react';
import { string } from 'prop-types';
import { ReactComponent as Help } from '../../img/help.svg';

export default function HelpPopUp(props) {
  const [displayHint, setDisplayHint] = useState(false);

  const { hint } = props;

  return (
    <div
      onMouseEnter={() => {
        setDisplayHint(true);
      }}
      onMouseLeave={() => {
        setDisplayHint(false);
      }}
      className="help-container"
    >
      <Help />
      {displayHint ? (
        <p style={{ display: displayHint }} className="help-popup">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

HelpPopUp.propTypes = {
  hint: string.isRequired,
};
