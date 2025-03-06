import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";

import Pagination from "@mui/material/Pagination";
import TransactionTable from "./subComponents/Table.jsx";

function Transaction() {
  // Simulating a larger dataset
  const transactionList = Array.from({ length: 100 }, (_, i) => ({
    id: `#TXN${1000 + i}`,
    user: `User ${i + 1}`,
    amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
    date: `Dec ${Math.floor(Math.random() * 31 + 1)}, 2024 - ${Math.floor(
      Math.random() * 12 + 1
    )}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")} ${
      Math.random() > 0.5 ? "AM" : "PM"
    }`,
    status: ["Successful", "Failed", "Pending"][
      Math.floor(Math.random() * 3)
    ],
    method: ["PayPal", "Credit Card", "Bank Transfer", "Debit Card", "Cash"][
      Math.floor(Math.random() * 5)
    ],
  }));

  const [transactions, setTransactions] = useState(transactionList);
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Paginate transactions
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Filter by search query
  const handleSearch = () => {
    const filtered = transactionList.filter((transaction) =>
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTransactions(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Filter by status
  const filterByStatus = (selectedStatus) => {
    if (!selectedStatus) {
      setTransactions(transactionList); // Show all if no filter is selected
    } else {
      const filtered = transactionList.filter(
        (transaction) => transaction.status === selectedStatus
      );
      setTransactions(filtered);
    }
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <Box sx={{maxWidth:'95vw'}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <TextField
          required
          id="search"
          label="Search By Id"
          variant="outlined"
          size="small"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            marginRight: "10px",
            width: "70%",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "100%" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "60%",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        <Typography variant="body2">
          {transactions.length} Transactions
        </Typography>

        <FormControl sx={{ minWidth: 80, padding: "0.8em", margin: "0px" }}>
          <InputLabel id="filterLabel">Filter</InputLabel>
          <Select
            labelId="filterLabel"
            id="filter"
            value={status || ""}
            onChange={(e) => {
              setStatus(e.target.value);
              filterByStatus(e.target.value);
            }}
            autoWidth
            label="Filter"
            sx={{ height: "2em" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Successful">Success</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Render the paginated transactions */}
      <TransactionTable transactions={paginatedTransactions} />

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={Math.ceil(transactions.length / itemsPerPage)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default Transaction;