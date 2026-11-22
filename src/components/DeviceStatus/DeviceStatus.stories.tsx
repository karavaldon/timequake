import type { Meta, StoryObj } from '@storybook/react';
import { DeviceStatus, DeviceChip } from './DeviceStatus';
const meta: Meta<typeof DeviceStatus> = { title: 'Core/Device Status', component: DeviceStatus, parameters: { docs: { description: { component: 'The PWA pairs with **a watch** and **a sensor strap** (HR + HRV). Each device has one row: connection, sync and battery. The header chip summarises both. The live dot uses the accent; disconnected is an empty ring plus the words "Not connected".' } } } };
export default meta; type S = StoryObj<typeof DeviceStatus>;
export const Rows: S = { render: () => <div style={{ maxWidth: 390 }}>
  <DeviceStatus kind="watch" name="Casio · Timequake mod" state="connected" battery={82} detail="Synced 4 min ago" />
  <DeviceStatus kind="strap" name="HR strap" state="syncing" battery={64} detail="3 of 8 runs" />
  <DeviceStatus kind="strap" name="HR strap" state="disconnected" detail="Wear it to connect" />
  <DeviceStatus kind="watch" name="Casio · Timequake mod" state="low-battery" battery={9} />
</div> };
export const Chip: S = { render: () => <div style={{ display: 'grid', gap: 12 }}><DeviceChip devices={[{ kind: 'watch', state: 'connected' }, { kind: 'strap', state: 'connected' }]} /><DeviceChip devices={[{ kind: 'watch', state: 'connected' }, { kind: 'strap', state: 'disconnected' }]} /></div> };
