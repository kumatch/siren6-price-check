import { useState } from 'react';
import { Text, Flex, Checkbox, TextField } from '@radix-ui/themes';
import { Fluctuation } from './search';

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
          <Text as="label" size="3">
            <Flex gap="3" align="center">
              買値
              <TextField.Input type="number" pattern="[0-9]*" id="buyPrice" size="2" style={{ width: 100 }} value={buyPrice || ''} onChange={e => {
                const price = +e.currentTarget.value;

                setBuyPrice(price);
                setSellPrice(undefined);
                onChange('buy' as PriceType, price, cursed ? 'cursed' : 'none');
              }} />
            </Flex>
          </Text>

          <Text as="label" size="3">
            <Flex gap="3" align="center">
              売値
              <TextField.Input type="number" pattern="[0-9]*" id="sellPrice" size="2" style={{ width: 100 }} value={sellPrice || ''} onChange={e => {
                const price = +e.currentTarget.value;

                setSellPrice(price);
                setBuyPrice(undefined);
                onChange('sell' as PriceType, +e.currentTarget.value, cursed ? 'cursed' : 'none');
              }} />
            </Flex>
          </Text>
        </div>
        <div
          style={{ display: 'flex', padding: '0 15px 30px 15px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
        >
          <Text as="label" size="3">
            <Flex gap="2">
              <Checkbox checked={cursed} onClick={_ => setCursed(!cursed)} />呪い
            </Flex>
          </Text>
        </div>
      </div>
    </div >
  );
};