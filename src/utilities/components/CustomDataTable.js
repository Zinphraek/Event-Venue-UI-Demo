import React from "react";
import PropTypes from "prop-types";
import { yellow } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { EntitiesListResponseModelShape } from "../models/EntitiesListResponseModel";

const CustomDataTable = (props) => {
  const { headerColumn, paginationModel, rows, setPaginationModel } = props;

  return (
    <div
      style={{
        height: rows?.content.length >= 5 ? "100%" : 440,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows.content}
        columns={headerColumn}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        rowCount={rows.totalElements}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: yellow[800],
          },
        }}
      />
    </div>
  );
};

CustomDataTable.propTypes = {
  headerColumn: PropTypes.array.isRequired,
  paginationModel: PropTypes.object.isRequired,
  rows: EntitiesListResponseModelShape.isRequired,
  setPaginationModel: PropTypes.func.isRequired,
};

export default CustomDataTable;
