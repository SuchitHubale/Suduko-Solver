var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}

var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j];
			} else {
				arr[i][j].innerText = '';
			}
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
    const timestamp = new Date().getTime(); // Add a timestamp to prevent caching
    const apiUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(`https://sugoku.onrender.com/board?difficulty=easy&t=${timestamp}`);
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            board = data.board;
            FillBoard(board);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch puzzle. Please try again later.');
        });
}
SolvePuzzle.onclick = () => {
	sudukoSolver(board, 0, 0, 9);
};

function isSafe(board, row, col, val, n) {
    // Row and column check
    for (let i = 0; i < n; i++) {
        if (board[row][i] == val || board[i][col] == val)
            return false;
    }

    // Submatrix check
    let si = row - (row % 3);
    let sj = col - (col % 3);
    for (let x = si; x < si + 3; x++) {
        for (let y = sj; y < sj + 3; y++) {
            if (board[x][y] == val) {
                return false;
            }
        }
    }
    return true;
}

function sudukoSolver(board, row, col, n) {
	// Base case
	if (row == n) {
		FillBoard(board);
		return true;
	}
	// If we are at the last column
	if (col == n) {
		return sudukoSolver(board, row + 1, 0, n);
	}
	// If cell is already filled
	if (board[row][col] != 0) {
		return sudukoSolver(board, row, col + 1, n);
	}
	for (let val = 1; val <= 9; val++) {
		// Check if val is safe
		if (isSafe(board, row, col, val, n)) {
			board[row][col] = val;
			// Recursive call
			let aagesolpossible = sudukoSolver(board, row, col + 1, n);
			if (aagesolpossible) {
				return true;
			}
			// Backtracking
			board[row][col] = 0;
		}
	}
	return false;
}
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});