import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

const RowAction = ({ row, table, handleDelete,handleEdit }) => {
    return (
        <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => handleEdit(row,table)}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDelete(row)}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default RowAction;
