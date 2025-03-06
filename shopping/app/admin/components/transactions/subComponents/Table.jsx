import React from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function TransactionTable({ transactions }) {
  const tableCell = ['Id', 'Date', 'Name', 'Amount', 'Method', 'Action'];

  return (
    <TableContainer component={Paper} sx={{ fontSize: '60px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {tableCell.map(cell => (
              <TableCell
                key={cell}
                sx={{
                  padding: '3px 6px',
                  maxWidth: 60,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={index} // Ensuring unique key
              sx={{
                backgroundColor:
                  transaction.status === 'Successful'
                    ? '#d4edda'
                    : transaction.status === 'Failed'
                    ? '#f8d7da'
                    : '#fff3cd',
              }}
            >
              <TableCell
                sx={{
                  padding: '3px 6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 150,
                }}
              >
                {transaction.id}
              </TableCell>
              <TableCell
                sx={{
                  padding: '3px 6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 70,
                }}
              >
                {transaction.date}
              </TableCell>
              <TableCell
                sx={{
                  padding: '3px 6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 70,
                }}
              >
                {transaction.user}
              </TableCell>
              <TableCell
                sx={{
                  padding: '3px 6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 100,
                }}
              >
                {transaction.amount}
              </TableCell>
              <TableCell
                sx={{
                  padding: '3px 6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 60,
                }}
              >
                {transaction.method}
              </TableCell>
              <TableCell
                sx={{
                  padding: '3px 6px',
                  position: 'relative',
                  overflowX: 'hidden',
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    padding: 0,
                  }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}