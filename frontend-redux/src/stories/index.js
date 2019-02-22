import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TestButton from 'components/TestButton';

storiesOf('Test', module)
  .add('Test Button', () => (
    <TestButton
      onClick={action('test button')}
      type="button"
    >
      Test button
    </TestButton>
    )
  );

