import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../hooks/apiUrl';

const Table = ({ data, setShowBuyers = null, originalData }) => {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [hoverPending, setHoverPending] = useState(false);
    const [statusOptions, setStatusOptions] = useState("");



    const HandleStatusChange = async (newStatus, rowData) => {

        let statusKr = ""

        if (newStatus === "pending") {
            statusKr = "대기중"
        }
        else if (newStatus === "approved") {
            statusKr = "승인"
        }
        else if (newStatus === "rejected") {
            statusKr = "거절"
        }

        const response = await axios.post(`${apiUrl}/new/updateStatus`, {
            productId: originalData[0]._id,
            status: newStatus,
            email: rowData.email,
            statusKr: statusKr
        });

        if (response.status === 200) {
            alert("상태가 변경되었습니다.");
        }

        else {
            console.log(response);
        }
    }

    useEffect(() => {

        console.log("originalData", originalData);
    }, [data, HandleStatusChange]);

    const StatusSelect = ({ rowId, initialStatus, rowData }) => {
        const [status, setStatus] = useState(initialStatus);
        const handleStatusChange = (e) => {
            const newStatus = e.target.value;
            console.log(rowData);

            if (window.confirm(`상태를 '${newStatus === 'pending' ? '대기중' :
                    newStatus === 'approved' ? '승인됨' :
                        '거절됨'}'(으)로 변경하시겠습니까? 해당 상태는 되돌릴 수 없습니다.`)) {
                HandleStatusChange(newStatus, rowData);
                setStatus(newStatus);
            }



        };

        return (
            <select
                value={status}
                onChange={handleStatusChange}
                disabled={status === 'approved'}  // Disable if approved
                className={`px-2 py-1 rounded-full text-center cursor-pointer
                ${status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'approved' ? 'bg-green-100 text-green-800' :
                            status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                ${status === 'approved' ? 'opacity-75 ' : ''}
                `}
            >
                <option value="pending">대기중</option>
                <option value="approved">승인됨</option>
                <option value="rejected">거절됨</option>
            </select>
        );
    };


    // Define columns
    const columns = [
        {
            header: '상태',
            accessorKey: 'status',
            cell: (info) => (
                <StatusSelect
                    rowId={info.row.id}
                    initialStatus={info.getValue()}
                    rowData={info.row.original}
                />
            ),
            filterFn: 'equals'
        },
        {
            header: '이름',
            accessorKey: 'name',
        },
        {
            header: '연락처',
            accessorKey: 'phoneNumber',
        },
        {
            header: '흥보 주소',
            accessorKey: 'url',
            cell: (info) => (
                <a href={"https://" + info.getValue()} target='_blank' className='text-blue-500 hover:underline'>{info.getValue()}</a>
            ),
        },
        {
            header: '채널',
            accessorKey: 'channel',
        }
    ];
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    return (
        <div className="space-y-4">
            {/* Search Filter */}
            <div className='bg-red-500 cursor-pointer w-28 h-10 flex items-center justify-center mt-4 rounded-lg text-white
            hover:bg-red-600
            '
                onClick={() => setShowBuyers(false)}>닫기</div>
            <div className="flex justify-between items-center">
                {/* <input
                    type="text"
                    value={filtering}
                    onChange={e => setFiltering(e.target.value)}
                    placeholder="검색..."
                    className="p-2 border rounded"
                /> */}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="p-2 px-4 border rounded"
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            {size}행 보기
                        </option>
                    ))}
                </select>
            </div>
            {/* Table */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center space-x-2">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {/* Sort indicators */}
                                            <span>
                                                {header.column.getIsSorted() === 'asc' ? ' �' :
                                                    header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </div>
    );
}
    ;
export default Table;