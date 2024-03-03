import { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { PriceForm } from './PriceForm';
import { searchItems, ResultItem } from './search';
import type { Item } from '../data/types';

export const Items = ({ values }: { values: Item[] }) => {
  const [results, setResults] = useState<ResultItem[]>([]);

  return (
    <>
      <PriceForm onChange={(type, price) => {
        setResults(searchItems(values, { type, price }))
      }} />

      {results.length > 0 && (
        <Table.Root mt="3">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>該当</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {results.map((result, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.RowHeaderCell>{result.name}</Table.RowHeaderCell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root >
      )}
    </>
  )
};