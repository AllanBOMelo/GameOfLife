import styles from './Game.module.css'

function Game () {

    const width = 320;
    const height = 320;
    const cellSize = 20;
    const rows = height/cellSize;
    const colums = width/cellSize;
    let isActive = false;  
    let counter = 0; 
    
    setInterval(()=>{
        if (isActive === true) {
            startGame();
        };
    },100);
    

    let grid = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < colums; j++) {
            row.push(Math.floor(Math.random() * 2));
        };
        grid.push(row);  
    };
    
    function eventClick (e) { 
        let cellid = e.target.id
        let cell = document.getElementById(cellid)

        let x = cellid.split(',')[0]
        let y = cellid.split(',')[1]

        if (cell.classList.value === 'alive') {
            cell.classList.value = ''
            grid[x][y] = 0;
        } else {
            cell.classList.value = 'alive'
            grid[x][y] = 1;
        }
    }

    function startGame (){
            let changes = [];

            for (let x = 0; x < rows; x++) {
                for (let y = 0; y < colums; y++) {
                    let cell = {};
                    let neighbors = 0;

                    /* North */
                    if ( x > 0) {
                        if (grid[x-1][y] === 1) {
                            neighbors += 1
                        }
                    }

                    /* NorthEast */
                    if ( x > 0 && y < colums -1) {
                        if (grid[x-1][y+1] === 1) {
                            neighbors += 1
                        }
                    }

                    /* East */
                    if (y < colums -1) {
                        if (grid[x][y+1] === 1) {
                            neighbors += 1
                        }
                    }

                    /* SouthEast */
                    if ( x < rows -1 && y < colums -1) {
                        if (grid[x+1][y+1] === 1) {
                            neighbors += 1
                        }
                    }

                    /* South */
                    if ( x < rows -1) {
                        if (grid[x+1][y] === 1) {
                            neighbors += 1
                        }
                    }

                    /* SouthWest */
                    if ( x < rows -1 && y > 0) {
                        if (grid[x+1][y-1] === 1) {
                            neighbors += 1
                        }
                    }

                    /* West */
                    if (y > 0) {
                        if (grid[x][y-1] === 1) {
                            neighbors += 1
                        }
                    }

                    /* NorthWest */
                    if ( x > 0 && y > 0) {
                        if (grid[x-1][y-1] === 1) {
                            neighbors += 1
                        }
                    }

                    if ( grid[x][y] === 0 && neighbors === 3) {
                    
                        cell.position = x + ',' + y
                        cell.state = 'alive'

                        changes.push(cell)
                    }

                    if ( grid[x][y] === 1 && neighbors < 2) {
                    
                        cell.position = x + ',' + y
                        cell.state = 'dead'

                        changes.push(cell)
                    }

                    if ( grid[x][y] === 1 && neighbors > 3) {
                    
                        cell.position = x + ',' + y
                        cell.state = 'dead'

                        changes.push(cell)
                    }

                }
            }

            changes.forEach(cell => {

                if (cell.state === 'alive') {
                    console.log(cell.state)
                    grid[cell.position.split(',')[0]][cell.position.split(',')[1]] = 1;
                    document.getElementById(cell.position).classList.value = 'alive';
                }

                if (cell.state === 'dead') {
                    grid[cell.position.split(',')[0]][cell.position.split(',')[1]] = 0;
                    document.getElementById(cell.position).classList.value = '';
                }

            })
            
            counter += 1
            document.getElementById('counter').innerHTML = counter.toString();
    } 

    return (
        <div>

            <div className={styles.generation}>
                <h2>Geração</h2>
                <span id='counter'>0</span>
            </div>

            <div className={styles.container} style={{width: width, height: height, backgroundSize: `${cellSize}px ${cellSize}px` }} >
                {
                grid.map((rows, x) => 
                    rows.map((colums, y) => (
                        <div id={`${x},${y}`} className={grid[x][y] ? 'alive' : ''} key={x + y} style={{width: cellSize, height: cellSize}} onClick={eventClick}></div>
                    ))
                )
                }
            </div>

            <div className={styles.buttons}> 

                <button id='start' className={styles.startButton} onClick={(e) => {
                    e.target.disabled = true
                    document.getElementById('pause').disabled = false
                    isActive = true
                }}> Iniciar </button>

                <button id='pause' className={styles.pauseButton} onClick={() => {
                    document.getElementById('start').disabled = false
                    isActive = false
                }}> Pausar </button>

                <button id='clear' className={styles.clearButton} onClick={() => {
                    for (let i = 0; i < rows; i++) {
                        for (let j= 0; j< colums; j++) {
                            grid[i][j] = 0
                            document.getElementById(i + ',' + j).classList.value = ''
                        }
                    }

                    document.getElementById('counter').innerHTML = '0'
                }}> Limpar </button>

            </div>
            
        </div>
    );
};

export default Game;