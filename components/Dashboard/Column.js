/*
    Column
    @params children
    Displays children in a vertical column
    William Doyle
    April 2022
*/
export default function Column({ children }) {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: `#000`,
    }}>
        {children}
    </div>
}