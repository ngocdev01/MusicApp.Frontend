import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import MaterialReactTable from "material-react-table";
import RowAction from "./RowAction";
import { SongDisplay } from "../Song";
import { useNavigate } from "react-router-dom";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import Confirm from "../Dialog/Confirm";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

export default function AlbumTable() {
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const [request, error, loading] = useAuthorizeRequest();
    const [dialog, setDialog] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const albums = await request({
                url: "https://localhost:7117/api/Album/all",
            });
            setData(albums);
        };
        fetchData();
    }, [update]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                hidden: true,
            },
            {
                accessorKey: "name",
                header: "Name",
            }
        ],
        []
    );

    if (!data)
        return (
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress color="primary" />
            </Box>
        );

    const handleCreateNewRow = async (values) => {};

    const handleDeleteRow = (row) => {
        setDialog(row.original);
    };

    const handleDeleteConfirm = async () => {
        const apiUrl = `https://localhost:7117/api/Album/${dialog.id}`;
        setDialog(null);
        const response = await request({
            url: apiUrl,
            method: "DELETE",
        });

        setUpdate(!update);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {};

    return (
        <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <MaterialReactTable
                data={data}
                columns={columns}
                editingMode="modal"
                enableRowActions
                enableHiding
                initialState={{ columnVisibility: { id: false } }}
                renderRowActions={({ row, table }) => (
                    <RowAction
                        row={row}
                        table={table}
                        handleDelete={handleDeleteRow}
                        handleEdit={(row, table) => navigate(row.original.id)}
                    />
                )}
                enableColumnResizing
                onEditingRowSave={handleSaveRowEdits}
                renderDetailPanel={({ row }) => (
                    <AlbumDisplay album={row.original} />
                )}
                renderBottomToolbarCustomActions={() => (
                    <Button
                        color="secondary"
                        onClick={() => navigate("upload")}
                        variant="contained"
                    >
                        Create New Album
                    </Button>
                )}
            />
            <Confirm
                open={dialog != null}
                onAbort={() => setDialog(null)}
                onConfirm={handleDeleteConfirm}
            />
        </Box>
    );
}



const AlbumDisplay = ({ album }) => {
    return (
        <Box
            sx={{
                display: "flex",
                padding: "20px",
                boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.5) 0px 10px 20px -10px inset",
                textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
            }}
        >
            <Box sx={{ display: "flex", flex: "1", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1" }}>
                    <Typography variant="h2" component="h2">
                        {album.name}
                    </Typography>
                </CardContent>
            </Box>
            <Box
                sx={{
                    boxShadow: "rgba(0, 0, 0, 1) 0px 5px 15px;",
                }}
                component="img"
                src={album.image}
                title={album.name}
                height="200px"
                width="200px"
            />
        </Box>
    );
};
