const Table = ({ children }) => <div className="Table">{children}</div>;

const Head = ({ children }) => <div className="TableHead">{children}</div>;

const Body = ({ children }) => <div className="TableBody">{children}</div>;

const Row = ({ children }) => <div className="TableRow">{children}</div>;

const Cell = ({ children }) => <div className="TableCell">{children}</div>;



const rowStyle = {
    position: 'relative',
    display: 'flex',
    with: '100%',
}
  