"use client";
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Head from 'next/head';

const MeasureProducts= () =>  {

    // таблица сыпучие продукты
    const [table1, setTable1] = useState(false);    
    const [page1, setPage1] = useState(0);
    const [rowsPerPage1, setRowsPerPage1] = useState(100);
    const columns1 = [
        { 
            id: 'name1', 
            label: 'Название продукта', 
            minWidth: 130 
        },
        { 
            id: 'data1', 
            label: 'Ст.л. без горки', 
            minWidth: 40, 
            },
        {
            id: 'data2',
            label: 'Ст.л. с горкой',
            minWidth: 40,         
        },
        {
            id: 'data3',
            label: 'Ч.л. без горки',
            minWidth: 40,
        },
        {
            id: 'data4',
            label: 'Ч.л. с горкой',
            minWidth: 40,
        },
        {
            id: 'data5',
            label: 'Стакан 200мл',
            minWidth: 40,
        },
        {
            id: 'data6',
            label: 'Стакан 250мл',
            minWidth: 40,
        },
    ];    
    function createData1(name1, data1, data2, data3, data4, data5, data6) {
        return { name1, data1, data2, data3, data4, data5, data6};
    };    
    const rows1 = [        
        createData1('Соль', 20, 30, 7, 10, 320, 400),
        createData1('Крупная соль', 18, 28, 5, 8, 280, 360),
        createData1('Белый сахар', 20, 25, 5, 7, 180, 200),
        createData1('Коричневый сахар', 20, "25-30", 7, 12, 180, 200),
        createData1('Ванильный сахар', 20, "25-30", 7, 12, "-", "-"),
        createData1('Сахарная пудра', 15, 30, 3, 5, 140, 180),
        createData1('Сухие дрожжи', 9, 15, 3, 5, "-", "-"),
        createData1('Сода', 20, "25-30", 7, 12, "-", "-"),
        createData1('Разрыхлитель', 9, 15, 3, 5, "-", "-"),
        createData1('Крахмал', 15, 30, 3, 5, "-", "-"),
        createData1('Пшеничная мука', 15, "25-30", 3, 5, 130, 160), 
        createData1('Мука ржаная', 15, 30, 4, 6, 140, 170),         
        createData1('Мука кукурузная', 15, "25-30", 3, 5, 130, 160), 
        createData1('Овсяные хлопья', 12, 16, 5, 8, 80, 100),     
        createData1('Манная крупа', 10, 16, 4, 7, 160, 200),
        createData1('Гречневая крупа', 18, 25, 6, 9, 170, 210),
        createData1('Рисовая крупа', 15, 20, 5, 8, 180, 220),
        createData1('Горох', 20, 25-30, 7, 12, 170, 220),
        createData1('Перловая крупа', 8, 12, 3, 5, 200, 250),
        createData1('Фасоль', 12, 16, 5, 8, 170, 220),
        createData1('Пшено', 15, 30, 4, 6, 140, 170),
        createData1('Чечевица', 18, 25, 6, 9, 170, 210),
        createData1('Вермишель', 15, 30, 4, 6, 150, 190),
        createData1('Молоко сухое', 20, "25-30", 7, 12, 120, 120),                                
        createData1('Какао-порошок', 10, 16, 4, 7, "-", "-"),
        createData1('Агар-агар', 8, 12, 3, 5, "-", "-"),        
        createData1('Желатин в гранулах', 10, 16, 4, 7, "-", "-"),        
        createData1('Лимонная кислота', 15, 20, 5, 8, "-", "-"),
        createData1('Кофе молотый', 12, 16, 5, 8, "-", "-"),
        createData1('Сухая горчица', 12, 18, 5, 8, "-", "-"),
        createData1('Перец молотый', 7, 10, 3, 5, "-", "-"),        
        createData1('Молотые сухари', 9, 15, 3, 5, 50, 110),
        createData1('Мак', 15, "25-30", 3, 5, 130, 160),
        
    ];

    const handleOpenTable1 = () => {
        setTable1 (true);
    };
    const handleCloseTable1 = () => {
        setTable1 (false);  
    }; 
    const handleChangePage1 = (event, newPage) => {
        setPage1(newPage);
    };
    const handleChangeRowsPerPage1 = (event) => {
        setRowsPerPage1(+event.target.value);
        setPage1(0);
    };


    // таблица жидкие продукты

    const [table2, setTable2] = useState(false);    
    const [page2, setPage2] = useState(0);
    const [rowsPerPage2, setRowsPerPage2] = useState(100);
    const columns2 = [
        { id: 'name2', label: 'Название продукта', minWidth: 130 },
        { id: 'data21', 
            label: 'Стол.ложка (мл)', 
            minWidth: 40,              
        },
        {
            id: 'data22',
            label: 'Чайная ложка (мл)',
            minWidth: 40,
        },
        {
            id: 'data23',
            label: 'Стакан 200мл (гр)',
            minWidth: 40,
        },
        {
            id: 'data24',
            label: 'Стакан 250мл (гр)',
            minWidth: 40,
        },
    ];    
    function createData2(name2, data21, data22, data23, data24) {
        return { name2, data21, data22, data23, data24};
    };    
    const rows2 = [        
        createData2('Вода', 15, 5, 200, 250),
        createData2('Молоко, жидкие сливки', 20, 7, 215, 275),
        createData2('Кефир, сметана, майонез', 18, 5, 230, 280),
        createData2('Творог', 20, 7, 215, 275),
        createData2('Сливочное масло', 17, 5, "-", "-"),
        createData2('Растительное масло', 17, 5, 185, 235),
        createData2('Соевый соус', 15, 5, "-", "-"),
        createData2('Уксус', 15, 5, "-", "-"),
        createData2('Томат-пюре, горчица', 25, 10, "-", "-"),
        createData2('Сгущенное молоко', 30, 12, 250, 300),
        createData2('Варенье', 50, 17, 270, 330),         
        createData2('Ликер, сироп', 20, 7, 220, 270),        
        createData2('Мед', 50, 17, 270, 330),             
    ];
    const handleOpenTable2 = () => {
        setTable2 (true);
    };
    const handleCloseTable2 = () => {
        setTable2 (false);  
    }; 
    const handleChangePage2 = (event, newPage) => {
        setPage2(newPage);
    };
    const handleChangeRowsPerPage2 = (event) => {
        setRowsPerPage2(+event.target.value);
        setPage2(0);
    };

    // таблица твердые продукты

    const [table3, setTable3] = useState(false);    
    const [page3, setPage3] = useState(0);
    const [rowsPerPage3, setRowsPerPage3] = useState(100);
    const columns3 = [
        { id: 'name3', label: 'Название продукта', minWidth: 130 },
        {
            id: 'data31',
            label: 'Стакан 250мл (грамм)',
            minWidth: 40,
        },
    ];    
    function createData3(name3, data31) {
        return { name3, data31};
    };    
    const rows3 = [      
        createData3('Голубика', 200),
        createData3('Вишня, черешня', 180),
        createData3('Брусника',140),
        createData3('Черника', 260 ),
        createData3('Брусника', 140),
        createData3('Ежевика', 190),
        createData3('Крыжовник', 210),
        createData3('Клюква', 145),
        createData3('Малина', 170),
        createData3('Смородина', 175),        
        createData3('Изюм', 190),
        createData3('Курага, чернослив', 150),
        createData3('Сушеные яблоки',70),
        createData3('Сушеные сливы', 150),
        createData3('Сушеная черника', 130),        
        createData3('Сушеные грибы', 70),
        createData3('Арахис, фундук, кешью, лесные орехи (очищ.)', 175),        
        createData3('Кедровые орехи (очищ.)', 140),
        createData3('Грецкие орехи (очищ.)', 110),
        createData3('Семечки подсолнечника очищеные', 130),
    ];
    const handleOpenTable3 = () => {
        setTable3 (true);
    };
    const handleCloseTable3 = () => {
        setTable3 (false);  
    }; 
    const handleChangePage3 = (event, newPage) => {
        setPage3(newPage);
    };
    const handleChangeRowsPerPage3 = (event) => {
        setRowsPerPage3(+event.target.value);
        setPage3(0);
    };
    
    // таблица веса овощей, фруктов
    const [table4, setTable4] = useState(false);    
    const [page4, setPage4] = useState(0);
    const [rowsPerPage4, setRowsPerPage4] = useState(100);
    const columns4 = [
            { id: 'name4', label: 'Название продукта (1 штука)', minWidth: 130 },
            {
                id: 'data41',
                label: 'Средний вес 1 шт. (гр)',
                minWidth: 40,
            },
            {
                id: 'data42',
                label: 'Кол-во на 500 гр (штук)',
                minWidth: 40,
            },
            {
                id: 'data43',
                label: 'Кол-во на 1 кг (штук)',
                minWidth: 40,
            },
    ];    
    function createData4(name4, data41, data42, data43) {
        return { name4, data41, data42, data43};
    };    
    const rows4= [    
            createData4('Помидор крупный', 300, "1.5-2", 3),  
            createData4('Помидор средний', "90-100", "5-6", 11),
            createData4('Помидор Черри', "10-30", "16-50", "33-62"),
            createData4('Огурец длинный', 300, 1.5, 3),
            createData4('Огурец средний', 120, 4, 8),
            createData4('Огурец корнишон', "10-20", "16-25", "50-100"),            
            createData4('Морковь средняя', 100, "4-5", "9-10"),
            createData4('Картофель средний', "120-170", "3-4", "6-8"),
            createData4('Лук репчатый средний', "130-150", "4-5", "9-10"),
            createData4('Лук Порей средний', "200-300", "2-3", "6-7"),
            createData4('Чеснок средняя головка', "30-50", "10-16", "20-32"),
            createData4('Чеснок зубчик', "5-10", "10-50", "20-100"),
            createData4('Свекла средняя', "200-300", "1.5-2", "3-4"),
            createData4('Кабачок, цукини средний', "250-300", "1.5", 3),
            createData4('Шампиньон средний', "20-30", "16-25", "33-50"),
            createData4('Кочан капусты средний', "1500-2000", "1/3", "1/2"),
            createData4('Кочан цветной капусты средний', "700", "0.7", "1.5"),
            createData4('Кочан брокколи средний', "350-500", "1", "2"),   
            createData4('Кольраби средняя', "120", "4", "8"),           
            createData4('Сельдерей стебель средний', "500", "1", "2"),
            createData4('Перец болгарский средний', "200-350", "2-3", "5-6"),
            createData4('Перец ласточка', "70-90", "5-7", "10-14"),
            createData4('Баклажан средний', "200-300", "2-3", "6-7"),
            createData4('Авокадо средний', "150-200", "2-3", "5-6"),
            createData4('Репа, редька средняя', "140-150", "3-4", "6-8"),
            createData4('Редис', 20, 25, 50),
            createData4('Фенхель средний', "300", "1.6", "3.2"),
            createData4('Салат Ромен', "600-700", "0.8", "1.6"),
            createData4('Салат Айсберг средний', "200-300", "2", "4"),            
            createData4('Зелень петрушки, кинзы, укропа, базилика, мяты средний пучок', "30-50", "-", "-"),
            createData4('Яблоко, груша, персик средний', "150-250", "2-3", "6-7"),
            createData4('Апельсин средний', "250", "2", "4"),
            createData4('Мандарин средний', "60-70", "7-8", "14-15"),
            createData4('Банан средний', "200-250", "2-2.5", "4-5"),
            createData4('Киви средний', "75", "6-7", "12-14"),
            createData4('Клубника средняя', "35-40", "12-14", "24-28"),
            createData4('Абрикос средний', "50", "10-12", "20-24"),
            createData4('Слива средняя', "25-35", "14-20", "28-40"),
    ];
    const handleOpenTable4 = () => {
        setTable4 (true);
    };
    const handleCloseTable4 = () => {
        setTable4 (false);  
    }; 
    const handleChangePage4 = (event, newPage) => {
        setPage4(newPage);
    };
    const handleChangeRowsPerPage4 = (event) => {
        setRowsPerPage4(+event.target.value);
        setPage4(0);
    };

  return (
    <>
    {/* <Head>
        <title>Мера продуктов</title>
        <meta name="description" content="измерить продукты без весов, сколько весит картофель, сколько огурцов в кг, помидоров в кг, сколько молока в стакане, в столовой ложке, в чайной ложке"/>
        <meta name="keywords" content="измерить продукты без весов, сколько весит картофель, сколько огурцов в кг, помидоров в кг, сколько молока в стакане, в столовой ложке, в чайной ложке"/>
        <meta name="robots" content="all" />
    </Head>   */}
    <div className='tableWrap'>
        <div className='flex-block'> 
            <h4 className='table-pd-1'><img className='flex-block-img' src='/icons/icon_table_measure1.png'/>Сыпучие продукты в граммах</h4>                                                                                   
            {!table1 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleOpenTable1} className='img_main' src="/icons/icon-close-block.png" alt=""/>                       
                    </span>                                                          
                </div>
            }
            {table1 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleCloseTable1} className='img_main' src="/icons/icon-open-block.png" alt=""/>                       
                    </span>                                                     
                </div>
            }                                              
        </div> 
            {table1 &&
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns1.map((column) => (
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
                        {rows1
                        .slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns1.map((column) => {
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
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows1.length}
                    rowsPerPage={rowsPerPage1}
                    page={page1}
                    onPageChange={handleChangePage1}
                    onRowsPerPageChange={handleChangeRowsPerPage1}
                />
                </Paper>
            } 

        <div className='flex-block'> 
        <h4 className='table-pd-1'><img className='flex-block-img' src='/icons/icon_table_measure2.png'/>Жидкие продукты</h4>                                                                                   
            {!table2 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleOpenTable2} className='img_main' src="/icons/icon-close-block.png" alt=""/>                       
                    </span>                                                          
                </div>
            }
            {table2 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleCloseTable2} className='img_main' src="/icons/icon-open-block.png" alt=""/>                       
                    </span>                                                     
                </div>
            }                                              
        </div> 
            {table2 &&
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns2.map((column) => (
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
                        {rows2
                        .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns2.map((column) => {
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
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows2.length}
                    rowsPerPage={rowsPerPage2}
                    page={page2}
                    onPageChange={handleChangePage2}
                    onRowsPerPageChange={handleChangeRowsPerPage2}
                />
                </Paper>
            } 

        <div className='flex-block'> 
        <h4 className='table-pd-1'><img className='flex-block-img' src='/icons/icon_table_measure3.png'/>Твердые продукты в стакане</h4>                                                                                   
            {!table3 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleOpenTable3} className='img_main' src="/icons/icon-close-block.png" alt=""/>                       
                    </span>                                                          
                </div>
            }
            {table3 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleCloseTable3} className='img_main' src="/icons/icon-open-block.png" alt=""/>                       
                    </span>                                                     
                </div>
            }                                              
        </div> 
            {table3 &&
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns3.map((column) => (
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
                        {rows3
                        .slice(page3 * rowsPerPage3, page3 * rowsPerPage3 + rowsPerPage3)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns3.map((column) => {
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
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows3.length}
                    rowsPerPage={rowsPerPage3}
                    page={page3}
                    onPageChange={handleChangePage3}
                    onRowsPerPageChange={handleChangeRowsPerPage3}
                />
                </Paper>
            } 


        <div className='flex-block'> 
        <h4 className='table-pd-1'><img src='/icons/icon_table_measure4.png' className='flex-block-img'/>Средний вес овощей и фруктов</h4>                                                                                   
            {!table4 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleOpenTable4} className='img_main' src="/icons/icon-close-block.png" alt=""/>                       
                    </span>                                                          
                </div>
            }
            {table4 &&
                <div>
                    <span className='icon-block icon-block-pos'>                                                 
                        <img onClick = {handleCloseTable4} className='img_main' src="/icons/icon-open-block.png" alt=""/>                       
                    </span>                                                     
                </div>
            }                                              
        </div> 
            {table4 &&
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns4.map((column) => (
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
                        {rows4
                        .slice(page4 * rowsPerPage4, page4 * rowsPerPage4 + rowsPerPage4)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns4.map((column) => {
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
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows4.length}
                    rowsPerPage={rowsPerPage4}
                    page={page4}
                    onPageChange={handleChangePage4}
                    onRowsPerPageChange={handleChangeRowsPerPage4}
                />
                </Paper>
            } 
    </div>
</>



    
    )
}  

export default MeasureProducts
