import { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { PriceForm } from './PriceForm';
import { searchBlessingItems, ResultBlessingItem } from './search';
import type { Item } from '../data/types';

export const BlessingItems = ({ values }: { values: Item[] }) => {
  const [results, setResults] = useState<ResultBlessingItem[]>([]);

  return (
    <>
      <PriceForm onChange={(type, price, fluctuation) => {
        setResults(searchBlessingItems(values, { type, price }, { fluctuation }))
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
                  <Table.RowHeaderCell>
                    {result.name}
                    {result.blessing ? '（祝福）' : ''}
                  </Table.RowHeaderCell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root >
      )}
    </>
  )
};