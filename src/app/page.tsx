import EnhancedTable from "@/components/cities/table";
import { Box, Paper, TableContainer } from "@mui/material";

export default function CitiesPage() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
        }}>
        <Paper sx={{ width: "100%", bgcolor: "rgba(0, 0, 0, 0.5)", color: "white" }}>
          <TableContainer>
            <EnhancedTable />
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
