import { useState, useCallback } from 'react';
import { Text, Flex, Checkbox } from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';
import { Fluctuation } from './search';

const labelStyle = { fontSize: '15px', fontWeight: 500, lineHeight: '35px' };
const inputStyle = {
  width: '100px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 10px',
  height: '35px',
  fontSize: '15px',
  lineHeight: '1',
}

export type PriceType = 'buy' | 'sell';

export const PriceForm = ({ onChange }: { onChange: (type: PriceType, price: number, fluctuation: Fluctuation) => void; }) => {
  const [buyPrice, setBuyPrice] = useState<number | undefined>();
  const [sellPrice, setSellPrice] = useState<number | undefined>();
  const [cursed, setCursed] = useState<boolean>(false);

  return (
    <div>
      <div>
        <div
          style={{ display: 'flex', padding: '0 15px 15px 15px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
        >
          <Label.Root htmlFor="buyPrice" style={labelStyle}>
            買値
          </Label.Root>
          <input type="number" pattern="[0-9]*" id="buyPrice" value={buyPrice || ''} style={inputStyle} onChange={e => {
            const price = +e.currentTarget.value;

            setBuyPrice(price);
            setSellPrice(undefined);
            onChange('buy' as PriceType, price, cursed ? 'cursed' : 'none');
          }} />

          <Label.Root htmlFor="sellPrice" style={labelStyle}>
            売値
          </Label.Root>
          <input type="number" pattern="[0-9]*" id="sellPrice" value={sellPrice || ''} style={inputStyle} onChange={e => {
            const price = +e.currentTarget.value;

            setSellPrice(price);
            setBuyPrice(undefined);
            onChange('sell' as PriceType, +e.currentTarget.value, cursed ? 'cursed' : 'none');
          }} />
        </div>
        <div
          style={{ display: 'flex', padding: '0 15px 30px 15px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
        >
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox checked={cursed} onClick={_ => setCursed(!cursed)} />呪い
            </Flex>
          </Text>
        </div>
      </div>
    </div >
  );
};