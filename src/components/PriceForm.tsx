import { useState, useEffect } from 'react';
import { Text, Flex, Checkbox, TextField } from '@radix-ui/themes';
import { Fluctuation } from './search';

export type PriceType = 'buy' | 'sell';

export const PriceForm = ({ onChange }: { onChange: (type: PriceType, price: number, fluctuation: Fluctuation) => void; }) => {
  const [values, setValues] = useState<{
    type: PriceType,
    price?: number,
    cursed: boolean,

    formPrice: {
      buy?: number
      sell?: number
    }
  }>({
    type: 'buy',
    cursed: false,
    formPrice: {},
  })

  useEffect(() => {
    if (!values) return;
    const { type, price, cursed } = values;

    if (type && price) {
      onChange(type, price, cursed ? 'cursed' : 'none');
    }
  }, [values]);

  return (
    <div>
      <div>
        <div
          style={{ display: 'flex', padding: '0 15px 15px 15px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
        >
          <Text as="label" size="3">
            <Flex gap="3" align="center">
              買値
              <TextField.Input type="number" pattern="[0-9]*" id="buyPrice" size="2" style={{ width: 100 }} value={values.formPrice.buy || ''} onChange={e => {
                const price = +e.currentTarget.value;

                setValues({
                  ...values,
                  type: 'buy',
                  price,
                  formPrice: {
                    buy: price,
                    sell: undefined,
                  }
                })
              }} />
            </Flex>
          </Text>

          <Text as="label" size="3">
            <Flex gap="3" align="center">
              売値
              <TextField.Input type="number" pattern="[0-9]*" id="sellPrice" size="2" style={{ width: 100 }} value={values.formPrice.sell || ''} onChange={e => {
                const price = +e.currentTarget.value;

                setValues({
                  ...values,
                  type: 'sell',
                  price,
                  formPrice: {
                    buy: undefined,
                    sell: price,
                  }
                })
              }} />
            </Flex>
          </Text>
        </div>
        <div
          style={{ display: 'flex', padding: '0 15px 30px 15px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
        >
          <Text as="label" size="3">
            <Flex gap="2">
              <Checkbox checked={values.cursed} onClick={_ => setValues({ ...values, cursed: !values.cursed })} />呪い
            </Flex>
          </Text>
        </div>
      </div>
    </div >
  );
};