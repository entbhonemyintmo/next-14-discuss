'use client';
import { NextUIProvider as Provider } from '@nextui-org/react';
import React from 'react';

interface NextUiProviderProps {
  children: React.ReactNode;
}

export function NextUIProvider({ children }: NextUiProviderProps) {
  return <Provider>{children}</Provider>;
}
