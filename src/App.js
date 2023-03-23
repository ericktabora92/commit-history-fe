import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';

function App() {
  const classes = useStyles();
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/commits/ericktabora92/commit-history')
      .then(response => response.json())
      .then(data => setCommits(data.commits))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2">Commits</Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell className={classes.tableCell}>SHA</TableCell>
              <TableCell className={classes.tableCell} align="right">Mensaje</TableCell>
              <TableCell className={classes.tableCell} align="right">Autor</TableCell>
              <TableCell className={classes.tableCell} align="right">Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commits.map((commit) => (
              <TableRow className={classes.tableRow} key={commit.sha}>
                <TableCell className={classes.tableCell} component="th" scope="row">
                  {commit.sha}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">{commit.message}</TableCell>
                <TableCell className={classes.tableCell} align="right">{commit.author}</TableCell>
                <TableCell className={classes.tableCell} align="right">{commit.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
