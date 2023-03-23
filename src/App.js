import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
  const classes = useStyles();
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!owner || !repo) {
      setError('Owner and repo are required');
      setCommits([]);
      return;
    }

    fetch(`http://localhost:3001/commits/${owner}/${repo}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setCommits(data.commits);
        setError(null);
      })
      .catch(error => {
        setCommits([]);
        setError(error.message || 'Something went wrong');
      });
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">Test with these Repositories: (commit-history-fe // commit-history)</Typography>
      <div className={classes.form}>
        <TextField
          className={classes.textField}
          label="Repository"
          variant="outlined"
          value={repo}
          onChange={e => setRepo(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Owner"
          variant="outlined"
          value={owner}
          onChange={e => setOwner(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Fetch Commits
        </Button>
      </div>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {commits.length > 0 ? (
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
      ) : (
        <Typography className={classes.noResults} variant="body1">
          No commits found.
        </Typography>
      )}
    </div>
  );
}

export default App;
