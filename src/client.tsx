import { createRoot } from 'react-dom/client'
import React, { Suspense, useEffect, useState } from 'react'

import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import { Box, Container, Heading, Button, Tabs, Text } from '@radix-ui/themes';
import { Items } from './components/Items'
import { BlessingItems } from './components/BlessingItems'
import { Pots } from './components/Pots'
import { Staves } from './components/Staves'
import type { Data } from './data/types';

const App = () => {
  return (
    <Theme radius="large">
      <Box>
        <Container size="3">
          <Suspense><Body /></Suspense>
        </Container>
      </Box>
    </Theme>
  )
}

const Body = () => {
  const data = useData();
  if (!data) {
    return <></>;
  }

  return (<>
    <Heading as="h1" mb="3">シレン6 価格チェック</Heading>

    <Tabs.Root defaultValue="bracelets">
      <Tabs.List>
        <Tabs.Trigger value="bracelets">腕輪</Tabs.Trigger>
        <Tabs.Trigger value="pots">壺</Tabs.Trigger>
        <Tabs.Trigger value="staves">杖</Tabs.Trigger>
        <Tabs.Trigger value="scrolls">巻物</Tabs.Trigger>
        <Tabs.Trigger value="grass">草</Tabs.Trigger>
      </Tabs.List>

      <Box mx="4" my="3">
        <Tabs.Content value="bracelets">
          <Items values={data.bracelets} />
        </Tabs.Content>
        <Tabs.Content value="pots">
          <Pots values={data.pots} />
        </Tabs.Content>
        <Tabs.Content value="staves">
          <Staves values={data.staves} />
        </Tabs.Content>
        <Tabs.Content value="scrolls">
          <BlessingItems values={data.scrolls} />
        </Tabs.Content>
        <Tabs.Content value="grass">
          <BlessingItems values={data.grass} />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  </>
  )
}

const fetchData = async () => {
  const res = await fetch('/api/data')
  return await res.json() as Data;
}

const useData = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setData(data);
    })();
  }, []);

  return data;
}

const domNode = document.getElementById('root')!
const root = createRoot(domNode)
root.render(<App />)