import { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { PriceForm } from './PriceForm';
import { searchResourceItems, ResultResourceItem } from './search';
import type { ResourceItem } from '../data/types';

const maxPotSpace = 6;

export const Pots = ({ values }: { values: ResourceItem[] }) => {
  const [results, setResults] = useState<ResultResourceItem[]>([]);

  return (
    <>
      <PriceForm onChange={(type, price) => {
        setResults(searchResourceItems(values, { type, price }, maxPotSpace))
      }} />

      {results.length > 0 && (
        <Table.Root mt="3">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>該当 (容量数)</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {results.map((result, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.RowHeaderCell>{`${result.name} (${result.resource})`}</Table.RowHeaderCell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root >
      )}
    </>
  )
};