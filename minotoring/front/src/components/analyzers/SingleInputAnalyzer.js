import React from 'react';
import { isEmpty } from 'lodash';
import Table from '../base-elements/Table';
import { buildStatisticsTableProps } from '../../utils/data-managers/TableDataManagers';

export default function SingleInputAnalyzer(props) {
  const { featureData } = props;
  if (isEmpty(featureData)) {
    return null;
  }
  return <Table {...buildStatisticsTableProps(featureData)} />;
}
