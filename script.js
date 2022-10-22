function drawGameboard()
{
	var htmlCode = "";
	for (i=0;i<6;i++)
	{
		htmlCode += "<tr>";
		for (j=0;j<7;j++)
		{
			htmlCode += "<td></td>";
		}
		htmlCode += "</tr>";
	}
	document.querySelector('table').innerHTML = htmlCode;
}

drawGameboard();

var gameStarted = true;
var turn = (Math.random() > 0.5) ? "blue" : "red";
var cells = document.querySelectorAll("td");
var info = document.querySelector("#info");

function changeTurn()
{
	if (turn === "blue") turn = "red";
	else turn = "blue";
	info.textContent = turn[0].toUpperCase() + turn.substr(1,) + "'s Turn";
}

function gameOver()
{
	if (false)
		{
			if (turn == "red")
			{
			info.textContent = "Blue wins!";
			} else {
			info.textContent = "Red wins!";
			}
			gameStarted = false;
			for (cell of cells)
			{
				cell.style.cursor = "default";
			}
		}
}

function editCell()
{
	if (this.className === "")
	{
		if (turn === "blue") this.className = "blueChips";
		else this.className = "redChips";
		changeTurn();
		gameOver();
	}
}

var cellNum = 0;
for (cell of cells)
{
	cell.addEventListener("click", editCell);
	cell.id = cellNum;
	cellNum++;
}

function chipDrop()
{
	
}
