import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ApiUrl } from "../../../Api/apiConfig";
import useAuth from "../../../Hook/useAuth";
import MaterialReactTable from "material-react-table";
import RowAction from "./RowAction";
import { SongDisplay } from "../Song";
import { useNavigate } from "react-router-dom";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import Confirm from "../Dialog/Confirm";

export default function SongTable() {
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [request] = useAuthorizeRequest();
    const [dialog, setDialog] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const songs = await request({
                url: ApiUrl.concat("/api/Song/all"),
            });
            setData(songs);
            setLoading(false);
        };
        fetchData();
    }, [update]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "song.id",
                header: "ID",
                hidden: true,
            },
            {
                accessorKey: "song.name",
                header: "Name",
            },
            {
                accessorKey: "song.count",
                header: "Plays",
            },
        ],
        []
    );
  
    const handleCreateNewRow = async (values) => {};

    const handleDeleteRow = (row) => {
        setDialog(row.original);
    };
    const handleDeleteConfirm = async () => {
        setLoading(true);
        const apiUrl = `https://localhost:7117/api/Song/${dialog.song.id}`;
        setDialog(null);
        const response = await request({
            url: apiUrl,
            method: "DELETE",
        });

        setUpdate(!update);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {};
    return (
        <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", position: 'relative'}}>
            {console.log(loading  || !Boolean(data))}
            <MaterialReactTable
                state={{isLoading : loading  || (! Boolean(data))}}
                data={data ?? []}
                columns={columns}
                editingMode="modal"
                enableRowActions
                enableHiding
                initialState={{ columnVisibility: { "song.id": false } }}
                renderRowActions={({ row, table }) => (
                    <RowAction
                        row={row}
                        table={table}
                        handleDelete={handleDeleteRow}
                        handleEdit={(row, table) =>
                            navigate(row.original.song.id)
                        }
                    />
                )}
                enableColumnResizing
                onEditingRowSave={handleSaveRowEdits}
                renderDetailPanel={({ row }) => (
                    <SongDisplay song={row.original} />
                )}
                renderBottomToolbarCustomActions={() => (
                    <Button
                        color="secondary"
                        onClick={() => navigate("upload")}
                        variant="contained"
                    >
                        Upload New Song
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
