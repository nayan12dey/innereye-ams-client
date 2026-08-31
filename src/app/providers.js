'use client';

import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';
// অথবা যদি @heroui/system ইনস্টল না থাকে:
// import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    );
}