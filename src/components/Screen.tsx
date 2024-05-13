import React from 'react';

type Props = {
    children: React.ReactNode;
}

const Screen: React.FC<Props> = ({ children }) => {
    return (
        <div className='bg-zinc-800 h-screen w-screen flex flex-col gap-y-4 items-center justify-center p-4'>{children}</div>
    )
}

export default Screen;