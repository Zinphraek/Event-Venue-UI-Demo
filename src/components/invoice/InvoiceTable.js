import React, { useMemo } from "react";
import { useTable } from "react-table";

const InvoiceTable = ({ reservation, overtime }) => {
	const data = useMemo(
		() => [
			{
				col1: "1",
				col2: "Facility",
				col3: "1",
				col4: reservation.rates.facilityRate,
				col5: "Dollar ($)",
				col6: reservation.rates.facilityRate,
			},
			{
				col1: "2",
				col2: "Guests Count",
				col3: reservation.numberOfSeats,
				col4: reservation.rates.seatRate,
				col5: "Dollar ($)",
				col6: reservation.numberOfSeats * reservation.rates.seatRate,
			},
			{
				col1: "3",
				col2: "Cleaning Fees",
				col3: "1",
				col4: reservation.rates.cleaningRate,
				col5: "Dollar ($)",
				col6: reservation.rates.cleaningRate,
			},
			...(overtime > 0
				? [
						{
							col1: "4",
							col2: "Overtime",
							col3: overtime,
							col4: reservation.rates.overtimeRate,
							col5: "Dollar/Hour ($/h)",
							col6: overtime * reservation.rates.overtimeRate,
						},
				  ]
				: []),
			...reservation.addOns.map((requestedAddOn, index) => ({
				col1: overtime > 0 ? index + 5 : index + 4,
				col2: requestedAddOn.addOn.name,
				col3: requestedAddOn.quantity,
				col4: requestedAddOn.addOn.price,
				col5: "Dollar ($)",
				col6: requestedAddOn.quantity * requestedAddOn.addOn.price,
			})),
		],
		[reservation, overtime]
	);

	// Define columns
	const columns = useMemo(
		() => [
			{
				Header: "#",
				accessor: "col1",
			},
			{
				Header: "Services/Product",
				accessor: "col2",
			},
			{
				Header: "Quantity",
				accessor: "col3",
			},
			{
				Header: "Price",
				accessor: "col4",
			},
			{
				Header: "Unit",
				accessor: "col5",
			},
			{
				Header: "Total",
				accessor: "col6",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<div className="overflow-x-auto my-6 rounded border-b-2 border-gray-300">
			<table {...getTableProps()} className="bg-gray-200 min-w-full text-left">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr
							className="grid grid-cols-12"
							{...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup.headers.map((column, index) => (
								<th
									className={`flex flex-grow justify-start bg-yellow-500 p-2 text-white font-bold ${
										index === 0
											? "rounded-tl col-span-1"
											: index === 1
											? "col-span-3"
											: index === columns.length - 1
											? "rounded-tr col-span-2"
											: "col-span-2"
									} md:text-2xl`}
									{...column.getHeaderProps()}
								>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr
								className="border-t-2 border-gray-300 grid grid-cols-12"
								{...row.getRowProps()}
							>
								{row.cells.map((cell, index) => (
									<td
										className={`flex-grow p-2 justify-start ${
											index === 0
												? "rounded-tl col-span-1"
												: index === 1
												? "col-span-3"
												: index === columns.length - 1
												? "rounded-tr col-span-2"
												: "col-span-2"
										}`}
										{...cell.getCellProps()}
									>
										{cell.render("Cell")}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default InvoiceTable;
