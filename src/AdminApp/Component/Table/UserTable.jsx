import useAuth from "../../../Hook/useAuth";
import { ApiUrl } from "../../../Api/apiConfig";
import { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import RowAction from "./RowAction";
import Confirm from "../Dialog/Confirm";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";

export default function UserTable() {
    const auth = useAuth();
    const [data, setData] = useState(null);
    const [roleData, setRoleData] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [dialog, setDialog] = useState(null);
    const [request, error, loading] = useAuthorizeRequest();

    useEffect(() => {
        const fetchData = async () => {
            const roles = await request({
                url: ApiUrl.concat("/api/admin/role/all"),
            });

            setRoleData(roles);

            const users = await request({
                url: ApiUrl.concat("/api/admin/user/all"),
            });
            setData(users);
        };
        fetchData();
    }, [shouldUpdate]);

    const roles = useMemo(() => {
        if (!roleData) 
            return [];
        
        return roleData.map((role) => {
            return { value: role.id, text: role.name };
        });
    }, [roleData]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                hidden: true,
            },
            {
                accessorKey: "userName",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "password",
                header: "Password",
            },
            {
                accessorKey: "roleId",
                header: "Role",
                editSelectOptions: roles,
                editVariant: "select",
          
            },
        ],
        [roles]
    );

    //-------------------------------------------
    //-------------------------------------------
    const handleCreateNewRow = async (values) => {
        const result = await request({
            url: ApiUrl.concat("/api/admin/user"),
            token: auth.auth.token,
            contentType: "application/json",
            options: {
                method: "POST",
                body: JSON.stringify(values),
            },
        });
        setShouldUpdate(!shouldUpdate);
    };

    const handleDeleteRow = (row) => {
        setDialog(row);
    };
    const handleDeleteConfirm = async () => {
        await request({
            url: ApiUrl.concat(`/api/admin/user/${dialog.original.id}`),
            contentType: "application/json",
            token: auth.auth.token,
            options: {
                method: "DELETE",
            },
        });
        setDialog(null);
        setShouldUpdate(!shouldUpdate);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            const putData = async () => {
                
                const result = await request({
                    url: ApiUrl.concat(`/api/admin/user/${data[row.index].id}`),
                    contentType: 'application/json',
                    token: auth.auth.token,
                    options: {
                        method: "PUT",
        
                        data: JSON.stringify(values),
                    },
                });
                setShouldUpdate(!shouldUpdate)
            };
            putData();
            setShouldUpdate(!shouldUpdate);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    if (!data || !roleData) return <p>loading</p>;
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
                        handleEdit={(row, table) => table.setEditingRow(row)}
                    />
                )}
                enableColumnResizing
                onEditingRowSave={handleSaveRowEdits}
                renderBottomToolbarCustomActions={() => (
                    <Button
                        color="secondary"
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        Create New Account
                    </Button>
                )}
            />
            <CreateNewUserModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
            <Confirm
                open={dialog != null}
                onAbort={() => setDialog(null)}
                onConfirm={handleDeleteConfirm}
            />
        </Box>
    );
}

export const CreateNewUserModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = column.defaultValue ?? "";
            return acc;
        }, {})
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <Typography textAlign="center">Create New Account</Typography>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: "100%",
                            minWidth: { xs: "300px", sm: "360px", md: "400px" },
                            gap: "1.5rem",
                        }}
                    >
                        {columns.map((column) => {
                            if (!column.hidden)
                                return column.editVariant == "select" ? (
                                    <Select
                                        key={column.accessorKey}
                                        name={column.accessorKey}
                                        defaultValue={"1"}
                                        onChange={(e) =>
                                            setValues({
                                                ...values,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    >
                                        {column.editSelectOptions.map(
                                            (option) => {
                                                return (
                                                    <MenuItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.text}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                ) : (
                                    <TextField
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        onChange={(e) =>
                                            setValues({
                                                ...values,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                );
                        })}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    color="secondary"
                    onClick={handleSubmit}
                    variant="contained"
                >
                    Create New Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};
