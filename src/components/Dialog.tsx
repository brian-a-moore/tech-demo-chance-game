type Props = {
 children: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ children }) => {
    return <p className='text-white px-4 py-2 bg-emerald-600 rounded-md shadow-md text-center'>{children}</p>
};

export default Dialog;