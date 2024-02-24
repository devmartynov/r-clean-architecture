import React, {PropsWithChildren} from 'react';
import {IUseCases} from '@/domain/use-cases/use-cases.types.ts';

const UseCaseContext = React.createContext<IUseCases>({} as IUseCases);

export function useUseCases() {
    return React.useContext(UseCaseContext);
}

export default function UseCaseProvider({children, useCases}: PropsWithChildren<{useCases: IUseCases}>) {
    return (
        <UseCaseContext.Provider value={useCases}>
            {children}
        </UseCaseContext.Provider>
    );
}
