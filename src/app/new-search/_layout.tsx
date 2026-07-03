import { Stack } from 'expo-router';

import { WizardProvider } from '@/lib/wizard-context';

// the provider lives here so the draft survives moving between steps
// and gets thrown away with the stack when the wizard closes
export default function NewSearchLayout() {
  return (
    <WizardProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </WizardProvider>
  );
}
