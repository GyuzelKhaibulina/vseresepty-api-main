"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EmptyText from '../services/empty-text';

const TableCollapse= ({columns, createDataParams, tableName, title, metaDescription, metaKey, icon, tableId, text}) =>  {
    const [input, setInput] = useState([{"search_text": ""}]);
    const [table, setTable] = useState(false);    
    const [page, setPage] = useState(0);
    const [rowsSearch, setRowsSearch] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const columnsParams = columns;
    function createData(columnsParams) {        
        const createDataParams = columnsParams?.map((i)=>i.id);
         return { createDataParams };
    };    
    createData(columnsParams);
    const rows = createDataParams;
    const handleOpenTable = () => {
         setTable (true);
    };
    const handleCloseTable = () => {
        setTable (false);  
    }; 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage1 = (event) => {
        setRowsPerPage(+event.target.value);
       setPage(0);
    }; 

    const handleChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: EmptyText(e.target.value) })); 
    };          

    useEffect (() =>    
    {   
        var rowsF=new Array();
        rowsF=rows;
        var rowsS=new Array();
        if (((input.search_text!=="")||(input.search_text!==undefined)))
        {
            rowsF.map((v, i, arr)=> {
                if (arr[i]?.name.toLowerCase().includes(input?.search_text?.toLowerCase())===true) {
                    rowsS.push(arr[i]);
                }         
            })
            setRowsSearch(rowsS);
        }
        if (input.search_text==="")
        {
            setRowsSearch([]);
        }      
    }, [input.search_text]); 

  return (
    <>
     <div className='tableWrap'>
        <div className='flex-block'>   
            <h4><img className='flex-block-img' src={icon}/>{tableName}</h4>                                                                                   
            {!table &&
                <div>
                    <span className='icon-block-table icon-block-pos-table'>                                                 
                        <img onClick = {handleOpenTable} className='img_main' src="/icons/icon-close-block.png" alt=""/>                       
                    </span>                                                          
                </div>
            }
            {table &&
                <div>
                    <span className='icon-block-table icon-block-pos-table'>                                                 
                        <img onClick = {handleCloseTable} className='img_main' src="/icons/icon-open-block.png" alt=""/>                       
                    </span>                                                     
                </div>
            }                                              
        </div>
        {table &&
        <p className='table-collapse-text'>{text}</p> }
            {table &&
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>        
                <div className="searchTableInput">                                          
                    <input type="search" placeholder="Поиск" name="search_text" onChange={handleChange}/>
                    <div className="searchTableIcon">
                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="rgba(0, 0, 0, 0.65)"/>
                        </svg>
                    </div>
                </div>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table id={tableId} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns?.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((input.search_text==="")||(input.search_text===undefined)) &&
                        <>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow id={row.id} data-quantity="0" data-calories={row.calories} data-proteins={row.proteins} data-fats={row.fats} data-carbohydrates={row.carbohydrates} hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns?.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                            })
                            
                            }
                        </>
                        }
                    {input.search_text!=="" &&
                        <>
                            {rowsSearch
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow data-calories={row.calories} data-quantity="0" id={row.id} hover role="checkbox" tabIndex={-1} key={row.code} data-proteins={row.proteins} data-fats={row.fats} data-carbohydrates={row.carbohydrates}>
                                    {columns?.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                            })}
                        </>
                        }
                        
                    </TableBody>
                    </Table>
                </TableContainer>
                {((input.search_text==="")||(input.search_text===undefined)) &&
                    <>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage1}
                        />
                    </>                
                }
                {((input.search_text!=="")&&(input.search_text!==undefined)) &&
                    <>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rowsSearch.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage1}
                        />
                    </>                
                }
                </Paper>
            } 
    </div> 
</>



    
    )
}  

export default TableCollapse
